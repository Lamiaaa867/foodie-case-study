import { systemRoles } from "../../utils/system.role.js";

export const dishApisRoles = {
    CREATE_DISH:[systemRoles.cheef],
    UPDATE_DISH:[systemRoles.cheef],
    DELETE_DISH:[systemRoles.cheef],
    GETALL_DISH:[systemRoles.cheef],
    GETALL_OWNDISH:[systemRoles.cheef],
    GET_AVILABLE:[systemRoles.cheef,systemRoles.foodie],
    GET_SPECIFICDISHES:[systemRoles.cheef,systemRoles.foodie]

}