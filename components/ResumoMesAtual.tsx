import { Animated, TouchableOpacity, StyleSheet, View ,Text} from "react-native";
export default function ResumoMesAtual(){
    
    
    return (
        
        <View style={{paddingHorizontal: 20}} >
            <Text style={{color:"white",marginTop:30,fontSize:20,fontWeight:"600"}}>Resumo rapido do mês atual</Text>
            <View style={{backgroundColor:"#1c1c1da1",marginTop:20,width:350,padding:30,alignSelf:"center",borderRadius:20}}>
                <Text style={styles.text}>Valor gasto: 12% a mais</Text>
                <Text style={styles.text}>Maior gasto: Alimentação</Text>
                <Text style={styles.text}>Melhor Categoria: Invetimentos</Text>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
 text:{color:"white",fontSize:16,fontWeight:"bold",marginBottom:12}
});
