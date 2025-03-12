import React from "react"
import { TextArea } from "./text-area";
import { Button } from "./button";
import './comments.css'
import { getUser } from "../api/api";

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
      const userId = Number(localStorage.getItem('userId'))
      const data = await getUser(userId)
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
      <h2 style={{ marginBottom: '0'}}>Répondre</h2>

      <TextArea
        textKey=''
        cols={85}
        name='commentaire'
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <Button
        className='comments__send-button'
        labelKey="Poster"
        onClick={handleAddComment}
      />

      <h2>Commentaires ({comments.length})</h2>

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
        <p>Pas de commentaire à afficher</p>
      )}
    </div>
  );
};