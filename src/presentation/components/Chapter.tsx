import Routes, { prepareUrl } from "../../app/routes";
import { DBChapter } from "../../models/chapter";
import "../styles/App.scss";

interface ChapterProps {
  chapter: DBChapter;
  index: number;
}

export const Chapter = ({ chapter, index }: ChapterProps) => {
  return (
    <div>
      {/* //тут переход на конкретную главу для чтения */}
      <a href={prepareUrl(Routes.chapterRead, { chapterId: chapter._id })}>
        {`${index}. ${chapter.title}`}
      </a>
    </div>
  );
};

export default Chapter;
