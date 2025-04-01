import { Button, Stack } from "react-bootstrap";
import "../../styles/App.scss";
import { useEffect, useState } from "react";
import { getChapter, getChapters } from "../../../data/apiService";
import DefaultPageLayout from "../DefaultPage";
import { useNavigate, useParams } from "react-router-dom";
import Routes, { prepareUrl } from "../../../app/routes";
import { DBChapter } from "../../../models/chapter";

export default function ReadChapter() {
  const navigate = useNavigate();
  const { chapterId } = useParams();

  const [chapter, setChapter] = useState<DBChapter>();
  const [previousChapter, setPreviousChapter] = useState<DBChapter>();
  const [nextChapter, setNextChapter] = useState<DBChapter>();

  const handlePreviousClick = () => {
    navigate(
      prepareUrl(Routes.chapterRead, { chapterId: previousChapter?._id }),
    );
  };

  const handleNextClick = () => {
    navigate(prepareUrl(Routes.chapterRead, { chapterId: nextChapter?._id }));
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        if (chapterId === undefined) return;

        const fetchedChapter = await getChapter(chapterId);
        setChapter(fetchedChapter);

        const chapters = await getChapters(fetchedChapter.bookId);
        console.log(chapters);

        const fetchedChapterIndex = chapters.findIndex(
          (item) => item._id === fetchedChapter._id,
        );

        if (fetchedChapterIndex !== 0) {
          setPreviousChapter(chapters[fetchedChapterIndex - 1]);
        }
        if (fetchedChapterIndex !== chapters.length - 1) {
          setNextChapter(chapters[fetchedChapterIndex + 1]);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetch();
  }, [chapterId]);

  return (
    <DefaultPageLayout>
      <Stack
        direction="horizontal"
        className="justify-content-between align-items-center header mt-3"
      >
        <Button onClick={handlePreviousClick}>Прошлая глава</Button>
        <h3>{chapter?.title}</h3>
        <Button onClick={handleNextClick}>Следующая глава</Button>
      </Stack>

      <h4 className=" ms-5 justify-content-end text-start">
        {chapter?.comment}
      </h4>
      <p>{chapter?.text}</p>
    </DefaultPageLayout>
  );
}
