import {useAuth} from "../contexts/Auth"
export default function Home() {
    const {user} = useAuth()
    return ( 
        <div>
            
            { !user? <p>user not logged in</p> : <p>Welcome {user.username}</p>}
            
            
          
        </div>
    )
}
