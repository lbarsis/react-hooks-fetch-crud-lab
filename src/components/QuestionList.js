import React, { useState, useEffect} from "react";
import QuestionItem from './QuestionItem'

function QuestionList() {

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(r => r.json())
    .then(data => {
      setQuestions(data)
    })
  }, [])

  function handleDeleteQuestion(deletedQuestion){
    const displayQuestions = questions.filter(question => question.id !== deletedQuestion.id)
    setQuestions(displayQuestions)
  }

  function handleAnswerChange(updatedQuestion) {
    const displayQuestions = questions.map(question => question.id === updatedQuestion.id ? updatedQuestion : question)
    setQuestions(displayQuestions)
  }

  const displayQuestions = questions.map(question => {
    return <ul key={question.id} ><QuestionItem question={question} onDeleteQuestion={handleDeleteQuestion} onUpdateQuestion={handleAnswerChange}/></ul>
  })

  return (
    <section>
      <h1>Quiz Questions</h1>
      {displayQuestions}
    </section>
  );
}

export default QuestionList;
