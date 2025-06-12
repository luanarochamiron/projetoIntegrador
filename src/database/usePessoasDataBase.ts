import { Try } from 'expo-router/build/views/Try';
import { useSQLiteContext } from 'expo-sqlite';

export type PessoasDataBase = {
    id : number
    cpf: string      
    nome:string
    nomeSocial:string
    dataNascimento: string      
    email: string
    senha: string
}

export function usePessoasDataBase(){
    const dataBase = useSQLiteContext()

    async function create(data: Omit<PessoasDataBase, "id">){
        const statement = await dataBase.prepareAsync(
            "insert into pessoas(cpf,nome,nomeSocial,dataNascimento,email,senha) values ($cpf,$nome,$nomeSocial,$dataNascimento,$email,$senha)"
        )

        try {
            const result = await statement.executeAsync({
                $cpf : data.cpf,
                $nome : data.nome,
                $nomeSocial: data.nomeSocial,
                $dataNascimento: data.dataNascimento,
                $email: data.email,
                $senha: data.senha
            })

            //coletando e devolvendo o ultimo id cadastrado
            const insertedRowId = result.lastInsertRowId.toLocaleString()
            return{insertedRowId}

        } catch (error) {
            throw error
        }finally{//finalizar o processo
            await statement.finalizeAsync()
        }
    }//fim da função

    async function consultar(busca : string){
        try {
            const query = "select * from pessoas where nome like ? OR cpf like ?"
            const response = await dataBase.getAllAsync<PessoasDataBase>(query,`%${busca}%`,`%${busca}%`)
            return response 
        } catch (error) {
            throw error
        }
    }

    async function findByEmail(email: string): Promise<PessoasDataBase | undefined> {
        try {
          console.log("Buscando email:", email)
          const query = "select * from pessoas where email = ? limit 1"
          const result = await dataBase.getAsync<PessoasDataBase>(query, email)
          console.log("Resultado do banco:", result)
          return result ?? undefined
        } catch (error) {
          console.error("Erro no findByEmail:", error)
          throw error
        }
      }
      

    return {create,consultar,findByEmail }
}