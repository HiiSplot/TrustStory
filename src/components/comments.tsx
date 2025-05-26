import React from "react"
import { TextArea } from "./text-area";
import { Button } from "./button";
import { getUser } from "../api/auth";
import { t } from "i18next";
import { USER_ID } from "../context/AuthContext";
import './comments.css'

type Comments = {
  storyId: number
  pseudo: string
  date: string
  comment: string
}

type CommentsProps = {
  storyId: number
}

export const Comments: React.FC<CommentsProps> = ({ storyId }) => {
  const [comments, setComments] = React.useState<Comments[]>([])
  const [pseudo, setPseudo] = React.useState<string>('')
  const [newComment, setNewComment] = React.useState<string>('')

  const fetchUser = React.useCallback(async () => {
    try {
      const data = await getUser(Number(USER_ID))
      setPseudo(data.name)
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur :', error)
    }
  }, [])

  React.useEffect(() => {
    fetchUser()
  }, [fetchUser])

  const handleAddComment = () => {

    const comment: Comments = {
      storyId: storyId,
      pseudo: pseudo,
      date: new Date().toLocaleString(),
      comment: newComment,
    };

    setComments((prev) => [...prev, comment]);
    setNewComment("");
  };
  
  return (
    <div className='comments'>
      <h2 className="margin-top">{t("story.form.comment.response")}</h2>

      <TextArea
        textKey=''
        cols={85}
        name='commentaire'
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <Button
        className='comments__send-button'
        labelKey={t("story.form.button.post")}
        onClick={handleAddComment}
      />

      <h2 className="margin-top">{t("story.form.comment.title")} ({comments.length})</h2>

      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <div key={index} className="comments__commment-container">
            <div className="comments__commment-container__header">
              <p>{comment.pseudo}</p>
              <p>{comment.date}</p>
            </div>
            <p>{comment.comment}</p>
          </div>
        ))
      ) : (
        <p>{t("story.form.comment.noComment")}</p>
      )}
    </div>
  );
};