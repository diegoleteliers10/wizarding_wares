import { useDispatch, useSelector } from "react-redux";
import { 
    filterUserRole,
    filterUserActive,
    getAllUsers,
    sortByNameAscending,
    sortByNameDescending
} from "../../../../redux/adminSlice";
import { useEffect } from "react";

const FilterUsers = ()=>{
    const dispatch = useDispatch();
    const {filterRole, filterActive, sort2, allUsers} = useSelector(state => state.admin)

    const handleRoleChange = (event) => {
        const role = event.target.value;
        dispatch(filterUserRole(role));
      };

    const handleActiveChange = (event) => {
        const isActive = event.target.value
        dispatch(filterUserActive(isActive))    
    };
    const handleReset = ()=>{
        dispatch(getAllUsers());
        document.getElementById('filterRole').value = 'All';
        document.getElementById('filterIsActive').value = 'isActive';
        document.getElementById('orderByName').value = 'SortN';
      }
      function handleSortChange(event) {
        const sort2 = event.target.value;
        if (sort2 === 'nameAscending') {
          dispatch(sortByNameAscending());
        }else if(sort2 === 'nameDescending'){
          dispatch(sortByNameDescending());
        }
      }

      useEffect(()=>{
        console.log(allUsers)
        if(filterRole) document.getElementById('filterRole').value = filterRole;
        if(filterActive) document.getElementById('filterIsActive').value = filterActive;
        if(sort2.includes('name')){
          document.getElementById('orderByName').value = sort2;
        }    
      }, []);


    return(
        <div>
           <div className={`inline-block`}>
            {/* Filtro roles */}
                <select
                name="filterRole"
                id="filterRole"
                className={`appearance-none bg-white`}
                onChange={handleRoleChange}
                >
                    <option value="All">All roles</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                
                </select>
            </div>
            <div className="inline-block mx-8">
                <select
                    name="filterIsActive"
                    id="filterIsActive"
                    className={`appearance-none bg-white`}
                    onChange={handleActiveChange}
                    >
                    <option value="isActive" hidden>Is active</option>
                    <option value="All">All</option>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                    </select>
            </div>
            <div className={`inline-block`}>
                {/* Orden por nombre */}
                <select
                name="orderByName"
                id="orderByName"
                className='appearance-none bg-white'
                onChange={handleSortChange}
                >
                <option value="SortN" hidden>
                    Order
                </option>
                <option value="nameAscending">Name (A-Z)</option>
                <option value="nameDescending">Name (Z-A)</option>
                </select>
            </div> 
            <div className="inline-block">
                <button className="button bg-red" onClick={handleReset}>Reset</button>
            </div>
        </div>
    )
}
export default FilterUsers;