import { useTranslation } from "react-i18next"
import React, { useEffect } from "react"
import { MyModal } from "../components/modal"
import { StoryForm } from "../components/story-form"
import { Button, GridList, GridListItem } from "react-aria-components"
import { Card } from "../components/card"
import { IconButton } from "../components/icon-button"
import { Filter } from "../components/filter"
import { getCategories, getStories } from "../api/api"
import { PageLoader } from "../components/page-loader"
import '../components/filter.css'
import './style/stories.css'

export type Story = {
  id: number,
  title: string,
  date: string,
  author: string,
  description: string
}

export type Categories = {
  id: number,
  category_name: string,
  isSelected?: boolean
}

const fakeStories: Story[] = [
  {
    id: 1,
    title: 'Story 1',
    date: '01/01/2021',
    author: 'Author 1',
    description: 'Description 1'
  },
  {
    id: 2,
    title: 'Story 2',
    date: '01/01/2021',
    author: 'Author 2',
    description: 'Description 2'
  },
  {
    id: 3,
    title: 'Story 3',
    date: '01/01/2021',
    author: 'Author 3',
    description: 'Description 3'
  },
  {
    id: 4,
    title: 'Story 4',
    date: '01/01/2021',
    author: 'Author 4',
    description: 'Description 4'
  },
  {
    id: 5,
    title: 'Story 5',
    date: '01/01/2021',
    author: 'Author 5',
    description: 'Description 5'
  },
  {
    id: 6,
    title: 'Story 6',
    date: '01/01/2021',
    author: 'Author 6',
    description: 'Description 6'
  },
  {
    id: 7,
    title: 'Story 7',
    date: '01/01/2021',
    author: 'Author 7',
    description: 'Description 7'
  },
  {
    id: 8,
    title: 'Story 8',
    date: '01/01/2021',
    author: 'Author 8',
    description: 'Description 8'
  }
]

export const Stories: React.FC = () => {
  const { t } = useTranslation()
  const [isOpened, setIsOpened] = React.useState(false)
  const [isCardsDisplay, setIsCardsDisplay] = React.useState(true)
  const [stories, setStories] = React.useState<Story[]>([])
  const [categories, setCategories] = React.useState<Categories[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

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
      const data = fakeStories;
      // const data = await getStories();
      setStories(data);
      setIsLoading(false);
    } catch (error) {
      console.error('Erreur lors de la récupération des histoires :', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
    fetchCategories();
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
          {isCardsDisplay ? (
            <IconButton iconName="menu" labelKey='Liste' onClick={toggleDisplay} />
          ): (
            <IconButton iconName="check_box_outline_blank" labelKey='Grid' onClick={toggleDisplay} />
          )}
          <IconButton
            iconName='add'
            labelKey={t("home.button")}
            onClick={() => setIsOpened(true)}
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
        {isLoading 
        ? <PageLoader />
        :
        <GridList items={stories} aria-label="Stories list" className='stories-container__grid'>
        {stories.length > 0 ? (
          stories.map((story, index) => (
            <GridListItem key={index}>
              <Card 
                id={story.id}
                title={story.title} 
                date={story.date} 
                author={story.author} 
                description={story.description}
                FromStories
              />
            </GridListItem>
          ))
        ) : (
          <p>No stories available</p>
        )}
        </GridList>
        }
      </div>
      
      <MyModal isOpened={isOpened}>
        <StoryForm setIsOpened={setIsOpened} />
      </MyModal>
    </>
  )
}