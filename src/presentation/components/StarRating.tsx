import "../styles/App.scss";
import { useDispatch } from "react-redux";
import { addRating, updateRating } from "../../store/slices/ratingsSlice";
import { DBRating } from "../../models/rating";

interface StarRatingProps {
  value?: number;
  onUpdate?: (rating: number) => Promise<void>;
  bookId?: string;
  userId?: string;
}

const StarRating = ({ value = 0, onUpdate, bookId, userId }: StarRatingProps) => {
  const dispatch = useDispatch();

  const handleStarClick = async (star: number) => {
    if (onUpdate === undefined) return;
    
    if (bookId && userId) {
      const rating: DBRating = {
        _id: `${bookId}-${userId}`, // Временный ID, будет заменен на реальный после сохранения в БД
        bookId,
        userId,
        grade: star
      };
      
      try {
        await onUpdate(star);
        dispatch(addRating(rating));
      } catch (error) {
        console.error('Error updating rating:', error);
      }
    } else {
      onUpdate(star);
    }
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={star <= value ? "star highlighted" : "star"}
          onClick={() => handleStarClick(star)}
        >
          {/* этот код это окрашенная звезда */}
          &#9733;{" "}
        </span>
      ))}
    </div>
  );
};

export default StarRating;
