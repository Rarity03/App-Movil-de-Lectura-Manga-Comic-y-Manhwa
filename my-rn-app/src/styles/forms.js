import { StyleSheet } from "react-native"
import colors from "./colors"

const formsStyles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
      },
      input: {
        marginTop: 10,
        
        //marginBottom: 16,
      },
      btnSuccess:{
        backgroundColor: colors.primary,
        padding: 5,
      },
      btnText:{
        marginTop: 10,
      },
      btnTextLabel:{
        color: colors.dark,
      },
})

export default formsStyles