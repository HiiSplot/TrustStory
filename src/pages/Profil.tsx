import React from "react"
import { t } from "i18next"
import { Title } from "../components/title"
import { getFavoritesByUser, getInformations, getStoriesByUser } from "../api/api"
import { IconButton } from "../components/icon-button"
import { FavoriteStories } from "./FavoriteStories"
import { PostedStories } from "./PostedStories"
import { Story } from "./Stories"
import { useParams } from "react-router-dom"
import './style/form.css'
import './style/profil.css'
import { USER_ID } from "../context/AuthContext"

export const Profil: React.FC = () => {
  const { userId } = useParams()

  const previousTargetRef = React.useRef<HTMLElement | null>(null)
  const defaultLinkRef = React.useRef<HTMLAnchorElement | null>(null)

  const [activeTab, setActiveTab] = React.useState<string>('posted-stories')
  const [iconButtonName, setIconButtonName] = React.useState<string>('add')
  const [isFollowed, setIsFollowed] = React.useState<boolean>(false)
  const [favoritesStories, setFavoritesStories] = React.useState<Story[]>([])
  const [postedStories, setPostedStories] = React.useState<Story[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [userData, setUserData] = React.useState({
    id: '',
    firstname: '',
    lastname: '',
    pseudo: '',
    email: '',
    birthday: '',
    city: '',
  })
  
  const isCurrentUser = Number(USER_ID) === Number(userData.id)

  if (!userId) return
  
  const fetchProfil = async () => {
    try {
      const data = await getInformations(Number(userId))
      setUserData(data[0])
    } catch (error) {
      console.error('Erreur lors de la récupération des informations du profil :', error)
    }
  };

  const s = async () => {
    try {
      setIsLoading(true)
      const data = await getFavoritesByUser(Number(userId))

      const newData: Story[] = data.map((story: any) => ({
        userId: story.user_id,
        id: story.id,
        title: story.title,
        date: (story.date),
        author: story.author,
        description: story.description,
        categoryId: story.category_id,
        isFavorite: false,
      }));

      setFavoritesStories(newData)
      setIsLoading(false)
    } catch (error) {
      console.error('Erreur lors de la récupération des favoris :', error)
    }
  }

  const fetchStories = async () => {
    try {
      setIsLoading(true)
      const data = await getStoriesByUser(Number(userId))
      
      const newData: Story[] = data.map((story: any) => ({
        userId: story.user_id,
        id: story.id,
        title: story.title,
        date: (story.date),
        author: story.author,
        description: story.description,
        categoryId: story.category_id,
        isFavorite: false,
      }));

      setPostedStories(newData)
      setIsLoading(false)
    } catch (error) {
      console.error('Erreur lors de la récupération des histoires postées :', error)
    }
  }

  const toggleFollowButton = (iconName: string) => {
    if (iconName === 'add') {
      setIsFollowed(true)
      setIconButtonName('check')
    } else {
      setIsFollowed(false)
      setIconButtonName('add')
    }
  }

  const handleChangeRubric = (e: React.MouseEvent, tab: string) => {
    e.preventDefault()
    setActiveTab(tab)
    const target = e.target as HTMLElement

    if (previousTargetRef.current) {
      previousTargetRef.current.classList.remove("default")
    }

    target.classList.add("default")
    previousTargetRef.current = target
  }

  const name = `${userData.firstname} ${userData.lastname}`

  React.useEffect(() => {
    fetchProfil()
    s()
    fetchStories()

    if (defaultLinkRef.current) {
      defaultLinkRef.current.classList.add("default");
      previousTargetRef.current = defaultLinkRef.current;
    }
  }, [])  
  
  return (
    <>
    <div className="profil-container__page">

      <div className="profil-container__header">
        <div className="profil-container__header__image-container">
          <img
            className="profil-container__header__image-containe__img"
            src="https://static.vecteezy.com/system/resources/thumbnails/005/544/718/small_2x/profile-icon-design-free-vector.jpg"
            alt="Profil image"
          />

          <div className="profil-container__header__city">
            <span className="material-symbols-outlined">
              home_pin
            </span>
            {isCurrentUser && !userData.city ? <a>Votre ville</a> : <p>{userData.city ?? "Inconnu"}</p>}
          </div>
        </div>

        <div className="profil-container__header__user-infos" >
          <div className="profil-container__header__user-infos__buttons-container">
            <Title title={name}/>
            <p>@{userData.pseudo}</p>
            {!isCurrentUser &&
            <>
              <IconButton classNameText='profil-container__header__user-infos__buttons-container__icon' classNameButton={isFollowed ? 'follow' : ''} iconName={iconButtonName} type='button' labelKey={isFollowed ? t("story.button.unfollow") : t("story.button.follow")} onClick={() => {toggleFollowButton(iconButtonName)}} />
              <IconButton iconName='mail' type='button' labelKey={t("story.button.message")} onClick={() => {}} />
            </>
            }
          </div>
          <div className="profil-container__header__user-infos__stories-container">
            <span className="material-symbols-outlined">
              edit_square
            </span>
            <p className="profil-container__header__user-infos__stories-container__text">
              {t("profil.stories", { count: postedStories.length })}
            </p>
          </div>
          <div className="profil-container__header__user-infos__stories-container">
            <span className="material-symbols-outlined">
              favorite
            </span>
            <p className="profil-container__header__user-infos__stories-container__text">
            {t("profil.stories", { count: favoritesStories.length })}
            </p>
          </div>
        </div>
      </div>

      <div className="profil-content">

          {/* <a href="" className="link-profil">
            <div className="complete-profil">
              {isDisabled ? (
                <>
                  <span className="material-symbols-outlined complete-profil__span">edit</span>
                  <span onClick={(e) => toggleDisabled(e)}>Compléter le profil</span>
                </> 
                ) : (
                <>
                <span className="material-symbols-outlined complete-profil__span">block</span>
                <span onClick={(e) => toggleDisabled(e)}>Annuler</span>
                </>
                )
              }
            </div>
          </a> */}
          
        <div className="profil-content__links-container">
          <a
            href=""
            id="posted-stories"
            className="profil-content__links"
            onClick={(e) => handleChangeRubric(e, 'posted-stories')}
            ref={defaultLinkRef}
          >
            {t("profil.link.postedStory")}
          </a>
          <a
            href=""
            id="favorite-stories"
            className="profil-content__links"
            onClick={(e) => handleChangeRubric(e, 'favorite-stories')}
          >
            {t("profil.link.favoriteStories")}
          </a>
        </div>

        <div style={{ position: 'relative'}}>
          {activeTab === 'posted-stories' ?
          <PostedStories isLoading={isLoading} postedStories={postedStories} setPostedStories={setPostedStories} />
          : <FavoriteStories isLoading={isLoading} favoritesStories={favoritesStories} setFavoritesStories={setFavoritesStories} />}
        </div>
      </div>

    </div>
    </>
  )
}