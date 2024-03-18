function Vaalidation(values){
    let error={}
    const password_pattern=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]){8,}$/


    if(values.email===""){
        error.email="Email should not be empty"
    }else{
        error.email=""
    }

    if(values.password===""){
        error.password="Password should not be empty"
    }
    else if(!password_pattern.test(values.password)){
        error.password="Password didn't match"

    }
    else{
        error.password=""
    }
    return error;

}
export default Vaalidation;