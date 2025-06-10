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
    const dataBase = useSQLiteContext()//Acessar todos os metodos do bd

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

   
    return {create}
}