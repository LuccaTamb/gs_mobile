import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

export default function Localizacao() {
  const [estado, setEstado] = useState("SP");
  const [cidade, setCidade] = useState("");
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [titulo, setTitulo] = useState("");

  const navigation = useNavigation<any>();

  const irParaTempo = () => {
    if (!cidade.trim() || !bairro.trim()) {
      Alert.alert(
        "Campos obrigatórios",
        "Por favor, preencha pelo menos a cidade e o bairro"
      );
      return;
    }

    const localCompleto =
      `${estado} - ${cidade.trim()} - ${bairro.trim()}` +
      (rua.trim() ? ` - ${rua.trim()}` : "");

    // navigation.navigate("Tempo", { local: localCompleto });
    navigation.navigate("Tempo", {
      local: localCompleto,
      titulo: titulo,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Título do Evento 🛑</Text>
      <TextInput
        placeholder="Título do evento"
        value={titulo}
        onChangeText={setTitulo}
        style={styles.input}
        placeholderTextColor="#999"
      />

      <Text style={styles.titulo}> </Text>
      <Text style={styles.titulo}>Localização Atingida 📍</Text>

      <Text style={styles.label}>Estado *</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={estado}
          onValueChange={(itemValue) => setEstado(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Acre (AC)" value="AC" />
          <Picker.Item label="Alagoas (AL)" value="AL" />
          <Picker.Item label="Amapá (AP)" value="AP" />
          <Picker.Item label="Amazonas (AM)" value="AM" />
          <Picker.Item label="Bahia (BA)" value="BA" />
          <Picker.Item label="Ceará (CE)" value="CE" />
          <Picker.Item label="Distrito Federal (DF)" value="DF" />
          <Picker.Item label="Espírito Santo (ES)" value="ES" />
          <Picker.Item label="Goiás (GO)" value="GO" />
          <Picker.Item label="Maranhão (MA)" value="MA" />
          <Picker.Item label="Mato Grosso (MT)" value="MT" />
          <Picker.Item label="Mato Grosso do Sul (MS)" value="MS" />
          <Picker.Item label="Minas Gerais (MG)" value="MG" />
          <Picker.Item label="Pará (PA)" value="PA" />
          <Picker.Item label="Paraíba (PB)" value="PB" />
          <Picker.Item label="Paraná (PR)" value="PR" />
          <Picker.Item label="Pernambuco (PE)" value="PE" />
          <Picker.Item label="Piauí (PI)" value="PI" />
          <Picker.Item label="Rio de Janeiro (RJ)" value="RJ" />
          <Picker.Item label="Rio Grande do Norte (RN)" value="RN" />
          <Picker.Item label="Rio Grande do Sul (RS)" value="RS" />
          <Picker.Item label="Rondônia (RO)" value="RO" />
          <Picker.Item label="Roraima (RR)" value="RR" />
          <Picker.Item label="Santa Catarina (SC)" value="SC" />
          <Picker.Item label="São Paulo (SP)" value="SP" />
          <Picker.Item label="Sergipe (SE)" value="SE" />
          <Picker.Item label="Tocantins (TO)" value="TO" />
        </Picker>
      </View>

      <Text style={styles.label}>Cidade *</Text>
      <TextInput
        style={styles.input}
        value={cidade}
        onChangeText={setCidade}
        placeholder="Ex: São Paulo"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Bairro *</Text>
      <TextInput
        style={styles.input}
        value={bairro}
        onChangeText={setBairro}
        placeholder="Ex: Aclimação"
        placeholderTextColor="#999"
      />

      <Text style={styles.label}>Rua (opcional)</Text>
      <TextInput
        style={styles.input}
        value={rua}
        onChangeText={setRua}
        placeholder="Ex: Avenida Lins de Vasconcelos, 1264"
        placeholderTextColor="#999"
      />

      <TouchableOpacity
        style={[
          styles.botao,
          (!cidade.trim() || !bairro.trim()) && styles.botaoDesabilitado,
        ]}
        onPress={irParaTempo}
        disabled={!cidade.trim() || !bairro.trim()}
      >
        <Text style={styles.botaoTexto}>Avançar ➜</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: "#444",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: Platform.OS === "ios" ? 12 : 8,
    marginBottom: 20,
    fontSize: 16,
    color: "#333",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 20,
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
    marginTop: 10,
  },
  botaoDesabilitado: {
    backgroundColor: "#aaccff",
    opacity: 0.7,
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
