import { NavLink, Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// import { toast, Bounce } from 'react-toastify';
// import { Loading3QuartersOutlined } from '@ant-design/icons';
import { getUserInfo } from '../../services/services';
import classes from '../Layout/Layout.module.scss';



const Layout = () => {
  // const { userDetails, setUserDetails } = useState(null);
  // const { isLoaded, setIsLoaded } = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (token) {
    const fetchUserInfo = async () => {
      try {
        await getUserInfo(token);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();}
  }, [token]);

  const handleSignOut = () => {
    // Clear user data from Local Storage and state
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const handleProfileClick = () => {
    navigate('/profile'); // Перенаправление на страницу профиля
  };

  return (
    <>
      <header
        style={{
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          height: '80px',
          paddingTop: '0px',
          paddingLeft: '20px',
        }}
      >
        <span style={{ paddingTop: '15px' }}>
          <NavLink to='/articles' className={classes['header-title']}>
            Realworld Blog
          </NavLink>
        </span>
        <span>
          {token ? (
            <>
              <span
                style={{
                  display: 'flex',
                  flexWrap: 'nowrap',
                  alignContent: 'center',
                  justifyContent: 'space-evenly',
                }}
              >
                <NavLink to='/new-article' style={{ fontSize: '30px' }}>
                  <button
                    style={{ borderColor: '#ffffff' }}
                    className={classes['header-button']}
                    size={'small'}
                  >
                    Create article
                  </button>
                </NavLink>
                <div onClick={handleProfileClick} className={classes['profile']}>
                  <span>{JSON.parse(localStorage.getItem('user')).username}</span>
                  <span>
                    <img
                      src={user.image}
                      alt='user avatar'
                      style={{
                        width: '46px',
                        height: '46px',
                        borderRadius: '50%',
                        marginLeft: '5px',
                      }}
                    ></img>
                  </span>
                </div>
                <NavLink to='/articles'>
                  <button
                    style={{ borderColor: '#ffffff' }}
                    onClick={handleSignOut}
                    size='large'
                    className={classes['header-button']}
                  >
                    Sign Out
                  </button>
                </NavLink>
              </span>
            </>
          ) : (
            <>
              <NavLink to='/signin'>
                <button
                  style={{ borderColor: '#ffffff' }}
                  className={classes['header-button']}
                >
                  Sign In
                </button>
              </NavLink>
              <NavLink to='/signup'>
                <button
                  style={{ borderColor: '#ffffff' }}
                  className={classes['header-button']}
                >
                  Sign Up
                </button>
              </NavLink>
            </>
          )}
        </span>
      </header>
      <main className='container'>
        <Outlet />
      </main>
      <footer style={{ marginTop: '20px', width: '0px' }}></footer>
    </>
  );
};

export default Layout;