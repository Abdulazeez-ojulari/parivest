
import styles from './user.module.css'
import { useEffect, useState } from 'react';
import { getUser, getUsersByAccess, getUsersWithPageAndLimit } from '../api/lib/user';
import DatePicker from "react-datepicker";

export default function User(props) {
  const [loading, setLoadingState] = useState(false);
  const [users, setUsersState] = useState([]);
  const [user, setUserState] = useState({});
  const [meta, setMetaState] = useState({});
  const [page, setPageState] = useState(1);
  const [limit, setLimitState] = useState(8);
  const [status, setStatusState] = useState(false);
  const [profile, setProfileState] = useState(false);
  const [filterStatus, setFilterStatusState] = useState(false);
  const [access, setAccessState] = useState("All");
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  console.log(props)

  useEffect(() => {
    if(props.users)
    setUsersState(props.users)
    setMetaState(props.meta)
    setPageState(props.meta.page)
    setLimitState(props.meta.limit)
  }, []);

  async function view(userObj){
    let user = await getUser(userObj._id);
    console.log(user)
    setUserState(user.data.data)
    setProfileState(true)
  }
  
  function back(){
    setProfileState(false)
  }

  function openStatusFilter(){
    setFilterStatusState(!filterStatus)
  }

  function showStatus(){
    setStatusState(true)
  }

  function close(){
    setStatusState(false)
  }

  async function nextPage () {
    if(page < meta.pages){
        setLoadingState(true)
        let newPage = page + 1;
        setPageState(newPage)
        let res = await getUsersWithPageAndLimit(newPage, limit)
        if(res.data.data.length>0){
            setLoadingState(false)
            setUsersState(res.data.data[0].data)
            setMetaState(res.data.data[0].metadata)
        }
    }
  };

  async function prevPage () {
    if(page > 1){
        setLoadingState(true)
        let newPage = page - 1;
        setPageState(newPage)
        let res = await getUsersWithPageAndLimit(newPage, limit)
        if(res.data.data.length>0){
            setLoadingState(false)
            setUsersState(res.data.data[0].data)
            setMetaState(res.data.data[0].metadata)
        }
    }
  };

  async function getByAccess(access) {
    setLoadingState(true)
    if(access !== 'all'){
        let res = await getUsersByAccess(access)
        if(res.data.data.length>0){
            setAccessState(access)
            setLoadingState(false)
            setUsersState(res.data.data[0].data)
            setMetaState(res.data.data[0].metadata)
        }
    }else{
        let res = await getUsersWithPageAndLimit(1, limit)
        if(res.data.data.length>0){
            setAccessState(access)
            setLoadingState(false)
            setPageState(1)
            setUsersState(res.data.data[0].data)
            setMetaState(res.data.data[0].metadata)
        }
    }
  }

  return (
    <div className={styles.users_container}>
        {!profile &&
        <>
            <div className={styles.user_filter}>
                <div onClick={openStatusFilter} className={styles.user_filter_row_1}>
                    <h6>{access}</h6>
                    <span className={"iconify " + styles.icon} data-icon="eva:arrow-ios-downward-outline"></span>
                    {filterStatus &&
                    <div className={styles.logged_user}>
                        <ul className={styles.logged_user_row_2}>
                            <p onClick={() => getByAccess('all')}>All</p>
                            <p onClick={() => getByAccess('approved')}>Approved</p>
                            <p onClick={() => getByAccess('pending')}>Pending</p>
                            <p onClick={() => getByAccess('in-review')}>In-review</p>
                            {/* <Link href="/auth"><a>My Account</a></Link>
                            <Link href="/orders"><a>My Orders</a></Link> */}
                        </ul>
                    </div>
                    }
                </div>

                <div className={styles.user_filter_row_2}>
                    <div className={styles.user_filter_date_con}>
                        <div className={styles.user_filter_date}>
                            <label className={styles.user_filter_date_label} >
                                From
                            </label>
                            <div className={styles.user_filter_date_input}>
                                <DatePicker
                                    placeholderText="dd/mm/yyyy"
                                />
                                <span className={"iconify " + styles.date_icon} data-icon="uil:calender"></span>
                            </div>
                        </div>
                        <div className={styles.user_filter_date}>
                            <label className={styles.user_filter_date_label} >
                                To
                            </label>
                            <div className={styles.user_filter_date_input}>
                                <DatePicker
                                    placeholderText="dd/mm/yyyy"
                                />
                                <span className={"iconify " + styles.date_icon} data-icon="uil:calender"></span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.user_filter_search}>
                        <img src='/images/searchicon.png' className={styles.user_filter_search_icon} alt='search icon' />
                        <div className={styles.user_filter_search_input}>
                            <span className={"iconify " + styles.search_icon} data-icon="carbon:search"></span>
                            <input type='text' placeholder='Search' />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.users}>
            <table className={styles.table}>
                <thead>
                <tr className={styles.tr} style={{backgroundColor: 'white'}}>
                    <th className={styles.th}>Date joined</th>
                    <th className={styles.th}>User ID</th>
                    <th className={styles.th}>Name</th>
                    <th className={styles.th}>Email address</th>
                    <th className={styles.th}>Phone no.</th>
                    <th className={styles.th} style={{textAlign: 'center'}}>Status</th>
                    <th className={styles.th} style={{textAlign: 'center'}}>Action</th>
                </tr>
                </thead>
                <tbody>
                {!loading && 
                <>
                    {users.map(user => {
                        return (
                        <tr key={user._id} className={styles.refId + " " + styles.tr}>
                            <td className={styles.td}>{new Date(user.createdAt).getDate() + " " + months[new Date(user.createdAt).getMonth()] + " " + new Date(user.createdAt).getFullYear()}</td>
                            <td className={styles.td}>{user.client_id}</td>
                            <td className={styles.td}>{user.first_name + " " + user.last_name}</td>
                            <td className={styles.td}>{user.email}</td>
                            <td className={styles.td}>{user.phone}</td>
                            <td className={styles.td + " " + styles.status + " " + (user.status.access  === 'Pending' ? styles.pending : user.status.access === 'Approved' ? styles.approve: styles.review)} style={{justifySelf: 'center'}}>{user.status.access}</td>
                            <td onClick={() => view(user)} className={styles.td + " " + styles.view} style={{textAlign: 'center'}}>View</td>
                        </tr>
                        )
                    })}
                </>
                }
                
                </tbody>
            </table>
            </div>
            <div className={styles.user_pagination}>
                <div>
                    {
                        page > 1 &&
                        <div onClick={prevPage} className={styles.paginate_btn}>Prev</div>
                    }
                    {
                        page < meta.pages &&
                        <div onClick={nextPage} className={styles.paginate_btn}>Next</div>
                    }
                    
                </div>
                <p>{'' + page + ' of ' + meta.pages}</p>
            </div>
        </>
        }
        {profile &&
        <>
            <div className={styles.user_profile}>
                <div onClick={back} className={styles.user_profile_row_1}>
                    <span className={"iconify " + styles.backicon} data-icon="charm:arrow-left"></span>
                    <h6>{user.first_name + " " + user.last_name}</h6>
                </div>
                <div className={styles.user_profile_row_2}>
                    <div onClick={showStatus} className={styles.user_profile_date}>
                        View profile status
                    </div>
                </div>
            </div>
            <div className={styles.user_details}>
                <div className={styles.user_img}>
                    <img className={styles.user_profile_img} src={user.image} alt={user.first_name}></img>
                </div>
                <div className={styles.user_info_container}>
                    <h4>Account details</h4>
                    <div className={styles.user_infos}>
                        <div className={styles.user_info}>
                            <h5>User ID</h5>
                            <p>{user.client_id}</p>
                        </div>
                        <div className={styles.user_info}>
                            <h5>First name</h5>
                            <p>{user.first_name}</p>
                        </div>
                        <div className={styles.user_info}>
                            <h5>Last name</h5>
                            <p>{user.last_name}</p>
                        </div>
                        <div className={styles.user_info}>
                            <h5>Email address</h5>
                            <p>{user.email}</p>
                        </div>
                    </div>

                </div>
            </div>

            <div className={styles.user_details}>
                <div className={styles.user_info_container}>
                    <h4>Investment profile</h4>
                    <div className={styles.user_infos}>
                        <div className={styles.user_info}>
                            <h5>Annual income</h5>
                            <p>{user.employment.annual_income}</p>
                        </div>
                        <div className={styles.user_info}>
                            <h5>Investment goal</h5>
                            <p>{user.investment.goal}</p>
                        </div>
                        <div className={styles.user_info}>
                            <h5>Investment experience</h5>
                            <p>{user.investment.experience}</p>
                        </div>
                        <div className={styles.user_info}>
                            <h5>Marital status</h5>
                            <p>{user.investment.marital_status}</p>
                        </div>
                        <div className={styles.user_info}>
                            <h5>Next of kin name</h5>
                            <p>{user.investment.next_of_kin_name}</p>
                        </div>
                    </div>

                    <div className={styles.user_infos}>
                        <div className={styles.user_info}>
                            <h5>Next of kin phone</h5>
                            <p>{user.investment.next_of_kin_phone}</p>
                        </div>
                        <div className={styles.user_info}>
                            <h5>Next of kin email</h5>
                            <p>{user.investment.next_of_kin_email}</p>
                        </div>
                        <div className={styles.user_info}>
                            <h5>Next of kin relationship</h5>
                            <p>{user.investment.next_of_kin_relationship}</p>
                        </div>
                    </div>

                </div>
            </div>

            <div className={styles.user_details}>
                <div className={styles.user_info_container}>
                    <h4>Document upload</h4>
                    <div className={styles.user_document}>
                        <h3>{user.document.name}</h3>
                        <a target={'_blank'} rel="noreferrer" href={user.document.image}>Tap to view uploaded document</a>
                    </div>

                </div>
            </div>

            {status && 
            <div className={styles.status_pop_container}>
                <div className={styles.status_pop}>
                    <div className={styles.status_pop_top_1}>
                    <h2>Status</h2>
                    <div onClick={close} className={styles.status_pop_cancel_con}>
                        <span
                        className={"iconify" + " " + styles.status_pop_cancel}
                        data-icon="bi:x"
                        ></span>
                    </div>
                    </div>
                    <div className={styles.status_pop_top_2}>
                        <div className={styles.status_form_group}>
                            <label htmlFor="address" className={styles.status_form_label}>
                            Access
                            </label>
                            <div className={styles.status_form_input}>
                                <select value={user.status.access}>
                                    <option>Denied</option>
                                    <option>Approved</option>
                                    <option>In-review</option>
                                </select>
                                <span className={"iconify" + " " + styles.status_form_icon} data-icon="ep:arrow-down-bold"></span>
                            </div>
                        </div>
                        <div className={styles.status_form_group}>
                            <label htmlFor="address" className={styles.status_form_label}>
                            Account information
                            </label>
                            <div className={styles.status_form_input}>
                                <select value={user.status.document}>
                                    <option>Denied</option>
                                    <option>Approved</option>
                                    <option>In-review</option>
                                </select>
                                <span className={"iconify" + " " + styles.status_form_icon} data-icon="ep:arrow-down-bold"></span>
                            </div>
                        </div>
                        <div className={styles.status_form_group}>
                            <label htmlFor="address" className={styles.status_form_label}>
                            Investment profile
                            </label>
                            <div className={styles.status_form_input}>
                                <select value={user.status.investment}>
                                    <option>Denied</option>
                                    <option>Approved</option>
                                    <option>In-review</option>
                                </select>
                                <span className={"iconify" + " " + styles.status_form_icon} data-icon="ep:arrow-down-bold"></span>
                            </div>
                        </div>
                        <div className={styles.status_form_group}>
                            <label htmlFor="address" className={styles.status_form_label}>
                            Employment information
                            </label>
                            <div className={styles.status_form_input}>
                                <select value={user.status.employment}>
                                    <option>Denied</option>
                                    <option>Approved</option>
                                    <option>In-review</option>
                                </select>
                                <span className={"iconify" + " " + styles.status_form_icon} data-icon="ep:arrow-down-bold"></span>
                            </div>
                        </div>
                        <div className={styles.status_form_group}>
                            <label htmlFor="address" className={styles.status_form_label}>
                            Bio information
                            </label>
                            <div className={styles.status_form_input}>
                                <select value={user.status.biodata}>
                                    <option>Denied</option>
                                    <option>Approved</option>
                                    <option>In-review</option>
                                </select>
                                <span className={"iconify" + " " + styles.status_form_icon} data-icon="ep:arrow-down-bold"></span>
                            </div>
                        </div>
                        <button className={styles.button}>Update</button>
                    </div>
                    
                </div>
            </div>}
        </>
        }
    </div>
  )
}