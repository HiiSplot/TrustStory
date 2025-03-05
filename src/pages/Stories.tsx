import { useTranslation } from "react-i18next"
import React, { useEffect } from "react"
import { MyModal } from "../components/modal"
import { StoryForm } from "../components/story-form"
import { Button, GridList, GridListItem } from "react-aria-components"
import { Card } from "../components/card"
import { IconButton } from "../components/icon-button"
import '../components/filter.css'
import { Filter } from "../components/filter"
import { getCategories, getStories } from "../api/api"
import { Title } from "../components/title"

export type Story = {
  title: string,
  date: string,
  author: string,
  description: string
}

export type Categories = {
  id: number,
  name: string,
  isSelected?: boolean
}

export const Stories: React.FC = () => {
  const { t } = useTranslation()
  const [isOpened, setIsOpened] = React.useState(false)
  const [stories, setStories] = React.useState<Story[]>([]);
  const [categories, setCategories] = React.useState<Categories[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setIsLoading(true);
        const data = await getStories();
        setStories(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des histoires :', error);
        setIsLoading(false);
      }
    };

    fetchStories();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const data = await getCategories();
        setCategories(data);        
        setIsLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des histoires :', error);
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const sortItems: Categories[] = [
    { id: 1, name: 'Les + récentes', isSelected: false },
    { id: 2, name: 'Les - récentes', isSelected: false },
    { id: 3, name: 'Les + likées', isSelected: false },
    { id: 4, name: 'Les - likées', isSelected: false },
    { id: 5, name: 'Histoires que j\'ai likées', isSelected: false }
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
      <Title title={t("home.title")} />

      <IconButton
        iconName='add'
        labelKey={t("home.button")}
        onClick={() => setIsOpened(true)}
      />

      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <Filter title='Categories' items={categories} handleAction={categoriesAction} />
        <Filter title='Tri' items={sortItems} handleAction={sortAction}/>
      </div>

      <div className="filters-container">
        {categories.map((item) => 
          item.isSelected && 
            <div key={item.id} className="filters-container__items">
              <span>{item.name}</span>
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

      {isLoading ? <p>Loading...</p>
      :
      <GridList aria-label="Stories list" style={{ maxWidth: '100vh', display: 'grid', gap: '20px' }}>
      {stories.length > 0 ? (
        stories.map((story, index) => (
          <GridListItem key={index}>
            <Card 
              title={story.title} 
              date={story.date} 
              author={story.author} 
              description={story.description} 
            />
          </GridListItem>
        ))
      ) : (
        <p>No stories available</p>
      )}
      </GridList>
      }
      
      <MyModal isOpened={isOpened}>
        <StoryForm setIsOpened={setIsOpened} stories={stories} />
      </MyModal>
    </>
  )
}