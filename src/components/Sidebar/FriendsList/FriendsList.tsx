import * as React from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { RootStateType } from '../../../Redux/redux-store';
import { getFriends, sidebarActions } from '../../../Redux/sidebar-reducer';
import { selectFriendsData, selectFriendsRequestData, selectTotalFriendsCount } from '../../../Redux/sidebar-selectors';
import { FriendCardType, GetUsersParamsType, UserCardType } from '../../../types/types';
import Pagination from '../../../UI/Pagination';
import Preloader from '../../../UI/Preloader';
import { FriendLink } from './FriendLink/FriendLink';
import classes from './FriendsList.module.scss';

type PropsType = {}

const FriendsList: React.FC<PropsType> = (props) => {
	const friendsRequestData = useSelector(selectFriendsRequestData);
	const friendsTotalCount = useSelector(selectTotalFriendsCount);
	const friendsData = useSelector(selectFriendsData);

	const dispatch = useDispatch();
	const requestFriends = (requestData: GetUsersParamsType) => {
		dispatch(getFriends(requestData) as unknown as AnyAction);
	}

	const [isLoading, setIsLoading] = React.useState<boolean>(false);
	//set users
	React.useEffect(() => {
		const fetchFriends = async () => {
			setIsLoading(true);
			await requestFriends({...friendsRequestData, friend: true, term: ''});
			setIsLoading(false);
		}	
		fetchFriends();
	}, []);

	//2 -> [1, 2]
	let pagesNumbers = [];
	if(friendsTotalCount) {
		const pagesCount = Math.ceil(friendsTotalCount / friendsRequestData.pagesSize);
		for(let i = 1; i < pagesCount; i++) {
			pagesNumbers.push(i);
		}
	}

	//set current page
	const setCurrPage = (pageNum: number) => {
		dispatch(sidebarActions.setCurrentPage(pageNum));
	}

	//when fetching, show preloader
	if(isLoading) return <Preloader />

	return ( 
		<div className={classes.friends}>
			<h2 className={classes.title}>Friends</h2>
			<div className={classes.grid}>
				{/* Render friends about data */}
				{
					friendsData?.map((data: UserCardType) => {
						return <FriendLink friendInfo={data} key={data.id}/>
					})
				}
				<Pagination 
					pagesNumbers={pagesNumbers} currentPage={friendsRequestData.pageNum} 
					setCurrentPage={setCurrPage} whiteTheme={true} portionSize={6}
				/>
			</div>
		</div>
	)
}

export default FriendsList;
