
import AddNote from './AddNote'
import { Alert } from './Alert'
import { Notes } from './Notes'


export const Home = (props) => {
    const {showAlert} = props;
   
    return (
        <div>
          
          
        <Notes showAlert={showAlert}/>
        </div>
    )
}
