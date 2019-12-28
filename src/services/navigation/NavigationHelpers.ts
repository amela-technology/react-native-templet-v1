/*
 * Actions related with navigation
 * Every navigation action should be defined here
 * Avoid using this.props.navigation inside the code
 */
import {HomeRoute} from "./config/routes"
import NavigationService from "./NavigationService"

export function navigateToHome(params?: any) {
    NavigationService.navigate(HomeRoute.HOME, params)
}
