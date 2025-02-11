import { useTranslation } from "react-i18next"
import { Button } from "../components/button"
import React from "react"
import { MyModal } from "../components/modal"
import { StoryForm } from "../components/story-form"

type Home = {
}

export const Home: React.FC<Home> = () => {
  const { t } = useTranslation()

  const [isOpened, setIsOpened] = React.useState(false)

  return(
    <>
      <h1>{t("home.form.title")}</h1>
      <Button labelKey={t("home.button")} onClick={() => setIsOpened(true)} />
      <MyModal isOpened={isOpened}>
        <StoryForm setIsOpened={setIsOpened} />
      </MyModal>
    </>
  )
}