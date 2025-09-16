import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import questions from "../assets/jsons/questions.json";
import ResultScreen from "./ResultScreen";
import { Heart } from "lucide-react-native";

export default function QuizScreen() {
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [vidas, setVidas] = useState(3);
  const [lost, setLost] = useState(false);
  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionPress = (selectedOption: string) => {
    // Verifica se a resposta está correta ANTES de definir a opção selecionada
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(score + 1); // Aumenta a pontuação
    } else {
      setVidas(vidas - 1);
    }
    setSelectedOption(selectedOption);
    setIsOptionsDisabled(true);
  };
  // ...
  useEffect(() => {
    if (vidas === 0) {
      setLost(true);
      setIsQuizFinished(true);
    }
  }, [vidas]);

  const getOptionStyle = (option: string, color: string) => {
    if (!selectedOption) {
      return { backgroundColor: color };
    }
    if (selectedOption) {
      const isCorrect = option === currentQuestion.correctAnswer;
      if (isCorrect) {
        return styles.correctOption;
      }
      if (option === selectedOption && !isCorrect) {
        return styles.incorrectOption;
      }
    }
    return {};
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsOptionsDisabled(false);
    } else {
      // Quando as perguntas acabam, mudamos o estado para finalizado
      setIsQuizFinished(true);
    }
  };
  const handlePlayAgain = () => {
    setIsQuizFinished(false);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsOptionsDisabled(false);
    setScore(0);
    setVidas(3);
    console.log("Reiniciando o jogo...");
  };

  return isQuizFinished ? (
    <ResultScreen
      score={score}
      lost={lost}
      totalQuestions={questions.length}
      onPlayAgain={handlePlayAgain}
    />
  ) : (
    <View style={styles.container}>
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreText}>Pontuação: {score}</Text>
        <View style={{ flexDirection: "row", gap: 8 }}>
          {Array.from({ length: vidas }).map((_, i) => (
            <Heart key={i} color={"red"} fill={'red'} size={32} />
          ))}
        </View>
        <Text style={styles.scoreText}></Text>
      </View>

      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
      </View>

      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option) => (
          <TouchableOpacity
            key={option.option}
            style={[styles.option, getOptionStyle(option.option, option.color)]}
            onPress={() => handleOptionPress(option.option)}
            disabled={isOptionsDisabled}
          >
            <Text style={styles.optionText}>{option.option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedOption && (
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNextQuestion}
        >
          <Text style={styles.nextButtonText}>Próxima Pergunta</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fc",
    padding: 20,
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  scoreText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  questionContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  questionText: {
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
    color: "#222",
  },
  optionsContainer: {
    flex: 1,
    justifyContent: "space-evenly",
  },
  option: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#e0e0e0",
    backgroundColor: "#fff",
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  optionText: {
    fontSize: 18,
    color: "#333",
    textAlign: "center",
  },
  correctOption: {
    borderColor: "#4CAF50",
    backgroundColor: "#D4EDDA",
    borderWidth: 2,
  },
  incorrectOption: {
    borderColor: "#F44336",
    backgroundColor: "#F8D7DA",
    borderWidth: 2,
  },
  nextButton: {
    backgroundColor: "#5a67d8",
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  nextButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "600",
  },
});
