import React ,{ useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Card = ({topic}) => {

    function isEmpty(strIn)
    {
        if (strIn === undefined)
        {
            return true;
        }
        else if(strIn == null)
        {
            return true;
        }
        else if(strIn === "")
        {
            return true;
        }
        else
        {
            return false;
        }
    }

   const [isLoading, setIsLoading] = useState(true);
   const usersData = useSelector((state) => state.usersReducer);
   //const userData = useSelector((state) => state.userReducer);

   useEffect(() => {
       !isEmpty(usersData[0]) && setIsLoading(false);
   }, [usersData])

    return (        
        <li className="card-container" key={topic.id}>
            {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
            ) : (
                <>
                    <div className="card-left">
                        <img src={!isEmpty(usersData[0] && usersData.map((user) => {
                            if (user.id === topic.user_id) return
                            }).join(''))
                        }
                        />
                    </div>
                </>
            )}
        </li>
    );
};

export default Card;