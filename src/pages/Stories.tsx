import { useTranslation } from "react-i18next"
import React, { useEffect } from "react"
import { MyModal } from "../components/modal"
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

export type Story = {
  user_id: number
  id: number
  title: string
  date: string
  author: string
  description: string
  category_id: number
  isFavorite: boolean
}

export type Categories = {
  id: number
  category_name: string
  isSelected?: boolean
}

// const fakeStories: Story[] = [
//   {
//     id: 1,
//     title: 'Un titre un peu plus long',
//     date: '07 nov. 2022',
//     author: 'Author 1',
//     description: 'Une description un peu longue pour voir ce que ça donne un peu longue pour voir ce que ça donne mais qu\'est-ce que ça donne vraiment quand c\'est truncated?'
//   },
//   {
//     id: 2,
//     title: 'J\'ai découvert que ma mère avait une double vie',
//     date: '01 fev. 2023',
//     author: 'Author 2',
//     description: 'J\'ai découvert que ma mère vivait une double vie. Pendant des années, j\'avais des doutes, mais je n\'avais aucune idée de la vérité. Un jour, j\'ai trouvé des preuves qu\'elle avait un autre mari et d\'autres enfants que je ne connaissais même pas. C\'était un choc total. Je me suis senti trahi, et j\'ai eu du mal à comprendre comment elle avait pu me cacher ça pendant tout ce temps. Cela a bouleversé toute ma perception de ma famille et de ma mère, mais avec le temps, j\'ai dû accepter la réalité et reconstruire ma relation avec elle.'
//   },
//   {
//     id: 3,
//     title: 'Recherche mon chat perdu',
//     date: '10 avril2024',
//     author: 'Author 3',
//     description: 'Je pensais détester ce collègue pendant des années. Il me semblait arrogant, distant et tout ce que je n\'aimais pas. Mais un jour, nous avons dû travailler ensemble sur un projet, et peu à peu, j\'ai vu une autre facette de sa personnalité.'
//   },
//   {
//     id: 4,
//     title: 'Je me suis rendu compte que je vivais une vie que mes parents voulaient pour moi et non la mienne',
//     date: '18 sept. 2024',
//     author: 'Author 4',
//     description: 'Pendant des années, j\'ai vécu en suivant les attentes de mes parents. Je suis devenu avocat, comme ils l\'avaient toujours rêvé pour moi.'
//   },
//   {
//     id: 5,
//     title: 'J\'ai sauvé la vie d\'un étranger par accident.',
//     date: '1 juil. 2024',
//     author: 'Author 5',
//     description: 'Je ne pensais pas que ma journée allait se dérouler de cette façon. En me rendant à mon travail, j\'ai croisé quelqu\'un qui faisait une réaction allergique grave.'
//   },
//   {
//     id: 6,
//     title: 'Je me suis réconcilié avec mon père après 15 ans de silence.',
//     date: '28 janv. 2025',
//     author: 'Author 6',
//     description: 'Il y a 15 ans, j\'ai arrêté de parler à mon père après une dispute qui a tout déchiré. Nous n\'avons pas parlé pendant des années, et au fil du temps, j\'ai appris à vivre sans lui. '
//   },
//   {
//     id: 7,
//     title: 'J\'ai passé 10 ans à essayer de cacher mon orientation sexuelle à mes parents.',
//     date: '24 mars 2024',
//     author: 'Author 7',
//     description: 'J\'ai passé dix longues années à cacher qui je suis vraiment. J\'avais peur de la réaction de mes parents, alors j\'ai vécu dans un mensonge.'
//   },
//   {
//     id: 8,
//     title: 'Je suis tombé sur un journal intime de mon ex, et j\'ai découvert des choses que je n\'aurais jamais imaginées',
//     date: '15 sept. 2024',
//     author: 'Author 8',
//     description: 'Après ma rupture avec mon ex, j\'ai trouvé un vieux journal intime qu\'il avait laissé chez moi. Curieux, je l\'ai ouvert, et ce que j\'ai découvert m\'a complètement choqué. Il avait écrit des choses sur notre relation que je n\'aurais jamais imaginées. '
//   }
// ]

export const Stories: React.FC = () => {
  const [isFormEdit, setIsFormEdit] = React.useState(false)
  const [isFormOpened, setIsFormOpened] = React.useState(false)
  const [isStoryOpened, setIsStoryOpened] = React.useState(false)
  const [storyId, setStoryId] = React.useState<number>(0)
  const [isCardsDisplay, setIsCardsDisplay] = React.useState(true)
  const [stories, setStories] = React.useState<Story[]>([])
  const [categories, setCategories] = React.useState<Categories[]>([])
  const [isLoading, setIsLoading] = React.useState(true)
  const [isFavorite, setIsFavorite] = React.useState<boolean>(false)
  const [favoritesCount, setFavoritesCount] = React.useState<number>(0)
  
  const { t } = useTranslation()

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const data = await getCategories();
      setCategories(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des categories :', error);
      setIsLoading(false);
    }
  };

  const fetchStories = async () => {
    try {
      setIsLoading(true);
      // const data = fakeStories;
      const data = await getStories();
      setStories(data);
      
      setIsLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des histoires :', error);
      setIsLoading(false);
    }
  };

  const updateStoryFavorite = (storyId: number, isFav: boolean) => {
    setStories((prevStories) =>
      prevStories.map((story) =>
        story.id === storyId ? { ...story, isFavorite: isFav } : story
      )
    );
  };

  const isUserLikedStory = async (storyId: number) => {
    const data = await getFavoriteByStory(storyId)
    setIsFavorite(data.length > 0)
  }
  
  const favoriteToggle = async (storyId: number) => {
    const newFavoriteState = !isFavorite
  
    setIsFavorite(newFavoriteState)
    setFavoritesCount((prev) => newFavoriteState ? prev + 1 : prev - 1)
    updateStoryFavorite(storyId, newFavoriteState)
  
    try {
      if (newFavoriteState) {
        await postInFavorites(storyId);
      } else {
        await removeFavorite(storyId);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour des favoris", error);
      setIsFavorite(!newFavoriteState);
      setFavoritesCount((prev) => !newFavoriteState ? prev + 1 : prev - 1);
    }
  };

  useEffect(() => {
    fetchStories();
    fetchCategories();
    isUserLikedStory(storyId)
  }, []);

  const toggleDisplay = () => {
    setIsCardsDisplay(!isCardsDisplay)
  }

  const sortItems: Categories[] = [
    { id: 1, category_name: 'Les + récentes', isSelected: false },
    { id: 2, category_name: 'Les - récentes', isSelected: false },
    { id: 3, category_name: 'Les + likées', isSelected: false },
    { id: 4, category_name: 'Les - likées', isSelected: false },
    { id: 5, category_name: 'Histoires que j\'ai likées', isSelected: false }
  ];
  
  const categoriesAction = (id: number) => {
    setCategories(prevCategories =>
      prevCategories.map(item =>
        item.id === id ? { ...item, isSelected: !item.isSelected } : item
      )
    )
  }
  
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
              <span>{item.category_name}</span>
              <Button
                key={item.id}
                className='filter-container__items__button'
                onPress={() => categoriesAction(item.id)}
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
            setIsFavorite={setIsFavorite}
            updateStoryFavorite={updateStoryFavorite}
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
          isFavorite={isFavorite}
          setIsFavorite={setIsFavorite}
          favoritesCount={favoritesCount}
          setFavoritesCount={setFavoritesCount}
          favoriteToggle={favoriteToggle}
        />
      </MyModal>
    </>
  )
}