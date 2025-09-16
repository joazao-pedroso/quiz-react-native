import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// Usando TypeScript para definir os "tipos" de props que esperamos receber
type ResultScreenProps = {
  score: number;
  totalQuestions: number;
  onPlayAgain: () => void;
  lost?: boolean 
};

export default function ResultScreen({ score, totalQuestions, onPlayAgain, lost }: ResultScreenProps) {
  return (
    <View style={styles.container}>
      {
        lost ? (
          <Text style={styles.title}>Você Perdeu Todas as Vidas!</Text>
        ) : (
          <Text style={styles.title}>Parabéns! Você completou o Quiz!</Text>
        )
      }
      <Text style={styles.scoreText}>
        Você acertou {score} de {totalQuestions} perguntas!
      </Text>

      <TouchableOpacity style={styles.button} onPress={onPlayAgain}>
        <Text style={styles.buttonText}>Jogar Novamente</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f8ff',
  },
  title: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  scoreText: {
    fontSize: 24,
    marginBottom: 40,
    color: '#555',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});