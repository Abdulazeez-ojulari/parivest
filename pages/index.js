
import styles from '../components/dashboard/dashboard.module.css'
import { useEffect, useState } from 'react';
import Navbar from '../components/navbar/navbar';
import { getUsers } from '../components/api/lib/user';
import User from '../components/users/user';

export default function Home(props) {
  const [uiState, setUiState] = useState(null);
  const [users, setUsersState] = useState([]);
  console.log(props)

  useEffect(() => {
    if(props.users.data.length > 0)
    setUsersState(props.users.data[0].data)
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <Navbar></Navbar>
      </div>
      <div className={styles.right}>
        {users.length > 0 &&
        <User users={users}></User>}
      </div>
    </div>
  )
}


export async function getStaticProps(res) {
  let users = await getUsers();
  return {
    props: {
        users: users.data,
    },
  }
}