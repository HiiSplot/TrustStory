import { useTranslation } from "react-i18next"
import React from "react"
import { MyModal } from "../components/modal"
import { StoryForm } from "../components/story-form"
import { Button, GridList, GridListItem } from "react-aria-components"
import { Card } from "../components/card"
import { IconButton } from "../components/icon-button"
import '../components/filter.css'
import { Filter } from "../components/filter"

export type Story = {
  title: string,
  date: string,
  author: string,
  description: string
}

export type Categories = {
  id: number,
  name: string,
  isSelected: boolean
}

const stories: Story[] = [
  {
    title: "Pikachu",
    date: "2021-09-15",
    author: "Ash Ketchum",
    description: "Pikachu is an Electric-type Pokémon introduced in Generation I. It evolves from Pichu when leveled up with high friendship and evolves into Raichu when exposed to a Thunder Stone. Pikachu is known as the mascot of the Pokémon franchise and is famous for its powerful Thunderbolt attack."
  },
  {
    title: "Bulbasaur",
    date: "2021-08-30",
    author: "Professor Oak",
    description: "Bulbasaur is a Grass/Poison-type Pokémon introduced in Generation I. It evolves into Ivysaur at level 16 and then into Venusaur at level 32. Known for the plant bulb on its back, Bulbasaur is one of the three starter Pokémon available in Pokémon Red and Blue."
  },
  {
    title: "Squirtle",
    date: "2021-07-22",
    author: "Misty",
    description: "Squirtle is a Water-type Pokémon introduced in Generation I. It evolves into Wartortle at level 16, which then evolves into Blastoise at level 36. Squirtle is known for its tough shell and its ability to shoot water from its mouth to attack enemies."
  },
  {
    title: "Gengar",
    date: "2021-11-05",
    author: "Agatha",
    description: "Gengar is a Ghost/Poison-type Pokémon introduced in Generation I. It evolves from Haunter when traded and is the final form of Gastly. Gengar is known for its mischievous nature and ability to hide in shadows, striking fear into opponents with its eerie grin."
  },
  {
    title: "Dragonite",
    date: "2021-12-10",
    author: "Lance",
    description: "Dragonite is a Dragon/Flying-type Pokémon introduced in Generation I. It evolves from Dragonair at level 55 and is the final form of Dratini. Despite its large size, Dragonite is known for being a kind-hearted Pokémon capable of flying faster than the speed of sound."
  }
];

export const Stories: React.FC = () => {
  const { t } = useTranslation()
  const [isOpened, setIsOpened] = React.useState(false)

  const [categories, setCategories] = React.useState<Categories[]>([
    { id: 1, name: 'Action', isSelected: false },
    { id: 2, name: 'Adventure', isSelected: false },
    { id: 3, name: 'Comedy', isSelected: false },
    { id: 4, name: 'Crime', isSelected: false },
    { id: 5, name: 'Drama', isSelected: false },
    { id: 6, name: 'Fantasy', isSelected: false },
    { id: 7, name: 'Historical', isSelected: false },
    { id: 8, name: 'Horror', isSelected: false },
    { id: 9, name: 'Mystery', isSelected: false },
    { id: 10, name: 'Romance', isSelected: false },
  ]);

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
      <h1>{t("home.title")}</h1>

      <IconButton
        iconName='add'
        labelKey={t("home.button")}
        onClick={() => setIsOpened(true)}
      />

      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <Filter title='Catégories' items={categories} handleAction={categoriesAction} />
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

      <GridList aria-label="Favorite pokemon" style={{ maxWidth: '100vh', display: 'grid', gap: '20px' }}>
      {stories.length > 0 ? (
        stories.map((story) => (
          <GridListItem key={story.title} textValue="Charizard">
            <Card title={story.title} date={story.date} author={story.author} description={story.description} />
          </GridListItem>
        ))
      ) : (
        <p>No stories</p>
      )}
      </GridList>
      
      <MyModal isOpened={isOpened}>
        <StoryForm setIsOpened={setIsOpened} stories={stories} />
      </MyModal>
    </>
  )
}