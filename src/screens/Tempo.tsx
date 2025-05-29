import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Tempo() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const { local } = route.params || {};

  // Estados para cada unidade de tempo
  const [meses, setMeses] = useState<number>(0);
  const [semanas, setSemanas] = useState<number>(0);
  const [dias, setDias] = useState<number>(0);
  const [horas, setHoras] = useState<number>(0);
  const [minutos, setMinutos] = useState<number>(0);

  // Verificar se recebemos a localização
  if (!local) {
    Alert.alert("Erro", "Localização não encontrada");
    navigation.goBack();
    return null;
  }

  const irParaPrejuizos = () => {
    // Verifica se pelo menos uma unidade de tempo foi selecionada
    const temTempo =
      meses > 0 || semanas > 0 || dias > 0 || horas > 0 || minutos > 0;

    if (!temTempo) {
      Alert.alert(
        "Campo obrigatório",
        "Por favor, selecione pelo menos uma unidade de tempo"
      );
      return;
    }

    // Monta a descrição do tempo
    let tempoDescricao = "";
    if (meses > 0)
      tempoDescricao += `${meses} ${meses === 1 ? "mês" : "meses"} `;
    if (semanas > 0)
      tempoDescricao += `${semanas} ${semanas === 1 ? "semana" : "semanas"} `;
    if (dias > 0) tempoDescricao += `${dias} ${dias === 1 ? "dia" : "dias"} `;
    if (horas > 0)
      tempoDescricao += `${horas} ${horas === 1 ? "hora" : "horas"} `;
    if (minutos > 0)
      tempoDescricao += `${minutos} ${minutos === 1 ? "minuto" : "minutos"} `;

    navigation.navigate("Prejuizos", {
      local,
      tempoInterrupcao: tempoDescricao.trim(),
      titulo: route.params.titulo
    });
  };

  // Função para gerar opções numéricas
  const gerarOpcoes = (limite: number) => {
    return Array.from({ length: limite + 1 }, (_, i) => (
      <Picker.Item key={i} label={i.toString()} value={i} />
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Tempo de Interrupção ⏱️</Text>
      <Text style={styles.label}>Quanto tempo a região ficou sem energia?</Text>
      <Text style={styles.subLabel}>Selecione o tempo para cada unidade:</Text>

      <View style={styles.pickerGroup}>
        <Text style={styles.pickerLabel}>Meses</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={meses}
            onValueChange={(itemValue) => setMeses(itemValue)}
            style={styles.picker}
          >
            {gerarOpcoes(12)}
          </Picker>
        </View>
      </View>

      <View style={styles.pickerGroup}>
        <Text style={styles.pickerLabel}>Semanas</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={semanas}
            onValueChange={(itemValue) => setSemanas(itemValue)}
            style={styles.picker}
          >
            {gerarOpcoes(8)}
          </Picker>
        </View>
      </View>

      <View style={styles.pickerGroup}>
        <Text style={styles.pickerLabel}>Dias</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={dias}
            onValueChange={(itemValue) => setDias(itemValue)}
            style={styles.picker}
          >
            {gerarOpcoes(31)}
          </Picker>
        </View>
      </View>

      <View style={styles.pickerGroup}>
        <Text style={styles.pickerLabel}>Horas</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={horas}
            onValueChange={(itemValue) => setHoras(itemValue)}
            style={styles.picker}
          >
            {gerarOpcoes(24)}
          </Picker>
        </View>
      </View>

      <View style={styles.pickerGroup}>
        <Text style={styles.pickerLabel}>Minutos</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={minutos}
            onValueChange={(itemValue) => setMinutos(itemValue)}
            style={styles.picker}
          >
            {gerarOpcoes(59)}
          </Picker>
        </View>
      </View>

      <TouchableOpacity style={styles.botao} onPress={irParaPrejuizos}>
        <Text style={styles.botaoTexto}>Avançar ➜</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#444",
  },
  subLabel: {
    fontSize: 14,
    marginBottom: 15,
    color: "#666",
    fontStyle: "italic",
  },
  pickerGroup: {
    marginBottom: 15,
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 6,
    color: "#333",
    fontWeight: "500",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
  },
  picker: {
    width: "100%",
  },
  botao: {
    backgroundColor: "#0077cc",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
