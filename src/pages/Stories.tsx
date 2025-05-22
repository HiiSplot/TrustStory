import React, { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { MyModal } from "../components/modal"
import { Select, Story } from "../api/types"
import { StoryForm } from "../components/story-form"
import { Button } from "react-aria-components"
import { IconButton } from "../components/icon-button"
import { Filter } from "../components/filter"
import { getCategories, getFavoriteByStory, getStories, postInFavorites, removeFavorite } from "../api/api"
import { PageLoader } from "../components/page-loader"
import { StoryView } from "../components/story-view"
import { Grid } from "../components/grid"
import { MyTable } from "../components/table"
import '../components/filter.css'
import './style/stories.css'

export const Stories: React.FC = () => {
  const [isFormEdit, setIsFormEdit] = React.useState(false)
  const [isFormOpened, setIsFormOpened] = React.useState(false)
  const [isStoryOpened, setIsStoryOpened] = React.useState(false)
  const [isCardsDisplay, setIsCardsDisplay] = React.useState(true)
  // const [isFavorite, setIsFavorite] = React.useState<boolean>(false)

  const [storyId, setStoryId] = React.useState<number>(0)
  const [favoritesCount, setFavoritesCount] = React.useState<number>(0)

  const [stories, setStories] = React.useState<Story[]>([])
  const [categories, setCategories] = React.useState<Select[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const [filters, setFilters] = React.useState<number[]>([])
  const [searchValue, setSearchValue] = React.useState<string>('')


  const { t } = useTranslation()
  
  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const data = await getCategories();
  
      setCategories((prevCategories) => {
        return data.map((newCat: Select) => {
          const oldCat = prevCategories.find(c => c.id === newCat.id);
          return {
            ...newCat,
            isSelected: oldCat?.isSelected || false
          };
        });
      });
  
      setIsLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des categories :', error);
      setIsLoading(false);
    }
  };

  const fetchStories = async () => {
    try {
      setIsLoading(true)
      const data = await getStories({ filters, value: searchValue })
  
      const newData: Story[] = await Promise.all(
        data.map(async (story: any) => {
          const favorites = await getFavoriteByStory(story.id)
          const isFavorite = favorites.length > 0
          return {
            userId: story.user_id,
            id: story.id,
            title: story.title,
            date: story.date,
            author: story.author,
            description: story.description,
            categoryId: story.category_id,
            isFavorite: isFavorite,
            favoritesCount: favorites.length
          }
        })
      )
  
      setStories(newData)
      setIsLoading(false)
    } catch (error) {
      console.error('Erreur lors de la récupération des histoires :', error)
      setIsLoading(false)
    }
  }
  

  const updateStoryFavorite = (storyId: number, isFav: boolean) => {
    setStories(prev =>
      prev.map(story =>
        story.id === storyId ? { ...story, isFavorite: isFav } : story
      )
    )
  }

  const fetchFavorite = async () => {
    try {
      const data = await getFavoriteByStory(storyId)
      setFavoritesCount(data.length)
    } catch (error) {
      console.error("Erreur lors du chargement des favoris", error)
    } 
  }
  
  const toggleFavorite = async (storyId: number, currentFav: boolean) => {
    const newFav = !currentFav
    updateStoryFavorite(storyId, newFav)

    setStories((prevStories) =>
      prevStories.map((story) =>
        story.id === storyId
          ? {
              ...story,
              favoritesCount: newFav
                ? (story.favoritesCount || 0) + 1
                : Math.max((story.favoritesCount || 1) - 1, 0),
            }
          : story
      )
    );
  
    try {
      if (newFav) {
        await postInFavorites(storyId)
      } else {
        await removeFavorite(storyId)
      }
    } catch (err) {
      console.error("Erreur favori", err)
      updateStoryFavorite(storyId, !newFav) // rollback
    }
  }

  const toggleDisplay = () => {
    setIsCardsDisplay(!isCardsDisplay)
  }

  const sortItems: Select[] = [
    { id: 1, name: 'Les + récentes', isSelected: false },
    { id: 2, name: 'Les - récentes', isSelected: false },
    { id: 3, name: 'Les + likées', isSelected: false },
    { id: 4, name: 'Les - likées', isSelected: false },
    { id: 5, name: 'Histoires que j\'ai likées', isSelected: false }
  ];
  
  const categoriesAction = (id: number) => {
    setFilters((prevValue) => [...prevValue, id])
    setCategories(prevCategories =>
      prevCategories.map(item =>
        item.id === id ? { ...item, isSelected: !item.isSelected } : item
      )
    )
  }

  const categoriesDelete = (id: number) => {
    setFilters((prevFilters) => prevFilters.filter((filterId) => filterId !== id));
    setCategories((prevCategories) =>
      prevCategories.map((item) =>
        item.id === id ? { ...item, isSelected: !item.isSelected } : item
      )
    );
  };  
  
  const sortAction = (id: number) => {
    switch(id) {
      case 1: console.log('Les + récentes');
        break;
      case 2: console.log('Les - récentes');
        break;
      case 3: console.log('Les + likées');
        break;
      case 4: console.log('Les - likées');
        break;
      case 5: console.log('Histoires que j\'ai likées');
        break;
    }
  }

  useEffect(() => {
    fetchStories(); // ← se met à jour à chaque changement de filters
  }, [filters]);
  
  useEffect(() => {
    fetchCategories();
    fetchFavorite()
  }, []);

  return(
    <>
      <div className="stories-buttons-container">
        <div className="stories-buttons-container__buttons">
          <IconButton
            classNameText='stories-buttons-container__buttons__icon-button'
            iconName={isCardsDisplay ? "menu" : "check_box_outline_blank"}
            labelKey={isCardsDisplay ? 'List' : 'Grid'}
            onClick={toggleDisplay}
          />
          <IconButton
            iconName='add'
            labelKey={t("home.button")}
            onClick={() => setIsFormOpened(true)}
          />
          <Filter title='Categories' items={categories} handleAction={categoriesAction} />
          <Filter title='Tri' items={sortItems} handleAction={sortAction}/>
        </div>
      </div>

      <div className="filters-container">
        {categories.map((item) => 
          item.isSelected && 
            <div key={item.id} className="filters-container__items">
              <span>{item.name}</span>
              <Button
                key={item.id}
                className='filter-container__items__button'
                onPress={() => {categoriesDelete(item.id)}}
              >
                <span className="material-symbols-outlined filter-container__items__span">close</span>
              </Button>
            </div>
        )}
      </div>

      <div className="stories-container">
        {isLoading ? (
          <PageLoader />
        ) : isCardsDisplay ? (
          <Grid
            items={stories}
            setStories={setStories}
            setIsFormOpened={setIsFormOpened}
            setIsStoryOpened={setIsStoryOpened}
            setStoryId={setStoryId}
            setIsFormEdit={setIsFormEdit}
            updateStoryFavorite={updateStoryFavorite}
            toggleFavorite={toggleFavorite}
            />
        ) : (
          <MyTable items={stories} setIsStoryOpened={setIsStoryOpened} setStoryId={setStoryId} />
        )}
      </div>

      <MyModal isOpened={isFormOpened} setIsOpened={setIsFormOpened}>
        <StoryForm
          setIsOpened={setIsFormOpened}
          isFormEdit={isFormEdit}
          storyId={storyId}
          stories={stories}
          setStories={setStories}
        />
      </MyModal>

      <MyModal isOpened={isStoryOpened} setIsOpened={setIsStoryOpened}>
        <StoryView
          storyId={storyId}
          stories={stories}
          setIsOpened={setIsStoryOpened}
          toggleFavorite={toggleFavorite}
          setFavoritesCount={setFavoritesCount}
          favoritesCount={favoritesCount}
          // isFavorite={isFavorite}
          // setIsFavorite={setIsFavorite}
        />
      </MyModal>
    </>
  )
}