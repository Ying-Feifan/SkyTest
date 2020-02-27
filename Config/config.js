const env = 'dev';

const config = () =>{
    switch (env){
        case 'dev':{
            return{
                bd_url:'mongodb+srv://admin:admin@api-hsdbr.mongodb.net/test?retryWrites=true&w=majority',
                jwt_password:'sky2019',
                jwt_expires_in: '1h',
            }
        }
        case 'hml':{
            return{
                bd_string:'mongodb+srv://admin:admin@api-hsdbr.mongodb.net/test?retryWrites=true&w=majority',
                jwt_password:'sky2019',
                jwt_expires_in: '1h',
            }
        }
        case 'prod':{
            return{
                bd_string:'mongodb+srv://admin:admin@api-hsdbr.mongodb.net/test?retryWrites=true&w=majority',
                jwt_password:'sky2019',
                jwt_expires_in: '1h',
            }
        }

    }
}

console.log(`Iniciando a API em ambiente ${ env.toUpperCase()}`);

module.exports = config();
