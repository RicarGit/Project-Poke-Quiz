const quizForm = document.querySelector('.quiz-form') as HTMLFormElement
const scoreContainer = document.querySelector('.score-container') as HTMLElement
const correctAnswers = ['C', 'A', 'B', 'D']

let score = 0

const getUserAnswers = () => {
  const userAnswers = correctAnswers.map((_, index) =>
    quizForm[`inputQuestion${index + 1}`].value)

  return userAnswers
}

const calculateUserScore = (userAnswers: string[]) => {
  correctAnswers.forEach((answer, index) => {
    const isUserAnswerCorrect = answer === userAnswers[index]

    score += (isUserAnswerCorrect) ? 25 : 0
  })
}

const showFinalScore = () => {
  scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })

  scoreContainer.classList.remove('d-none')
}

const animateScoreCounter = () => {
  let counter = 0

  const timer = setInterval(() => {
    if (counter >= score) {
      clearInterval(timer)
      score = 0
    }

    let h2 = scoreContainer.querySelector('h2') as HTMLElement
    h2.textContent = `${counter++}%`
  }, 20)
}

const showUserScore = (e: Event) => {
  e.preventDefault()

  const userAnswers = getUserAnswers()

  calculateUserScore(userAnswers)
  showFinalScore()
  animateScoreCounter()
}

quizForm.addEventListener('submit', showUserScore)