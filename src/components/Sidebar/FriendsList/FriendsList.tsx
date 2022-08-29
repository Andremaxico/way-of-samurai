import * as React from 'react'
import { connect } from 'react-redux';
import { RootStateType } from '../../../Redux/redux-store';
import { getFriends, sidebarActions } from '../../../Redux/sidebar-reducer';
import { FriendCardType, GetUsersParamsType, UserCardType } from '../../../types/types';
import Pagination from '../../../UI/Pagination';
import Preloader from '../../../UI/Preloader';
import { FriendLink } from './FriendLink/FriendLink';
import classes from './FriendsList.module.scss';

type OwnProps = {
	friendsData: Array<UserCardType> | null,
}

type PropsType = {
	friendsTotalCount: number | null,
	friendsPageSize: number,
	friendsPageNum: number,
}
type CallbacksType = {
	setCurrentPage: (pageNum: number) => void,
	getFriends: (params: GetUsersParamsType) => void,
}

const FriendsList: React.FC<PropsType & CallbacksType & OwnProps> = ({
	friendsData, setCurrentPage, friendsTotalCount, friendsPageNum, friendsPageSize, getFriends
}) => {
	const [isLoading, setIsLoading] = React.useState<boolean>(false)
	//set users
	React.useEffect(() => {
		const fetchFriends = async () => {
			setIsLoading(true);
			await getFriends({pageNum: friendsPageNum, pagesSize: friendsPageSize});
			setIsLoading(false);
		}	
		fetchFriends();
	}, [friendsPageNum]);

	//2 -> [1, 2]
	let pagesNumbers = [];
	if(friendsTotalCount) {
		const pagesCount = Math.ceil(friendsTotalCount / friendsPageSize);
		for(let i = 1; i < pagesCount; i++) {
			pagesNumbers.push(i);
		}
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
					pagesNumbers={pagesNumbers} currentPage={friendsPageNum} 
					setCurrentPage={setCurrentPage} whiteTheme={true} portionSize={6}
				/>
			</div>
		</div>
	)
}

const mapStateToProps = (state: RootStateType) => ({
	friendsTotalCount: state.sidebar.friendsTotalCount,
	friendsPageSize: state.sidebar.friendsPageSize,
	friendsPageNum: state.sidebar.friendsPageNum,
})
const mapDispatchToProps = { 
	setCurrentPage: sidebarActions.setCurrrentPage,
	getFriends,
}

export default connect<PropsType, CallbacksType>(mapStateToProps, mapDispatchToProps)(FriendsList);
