// we export an array of full-screen height and width components that are the pages themselves so we can just map over them
import { ReactElement } from "react"
import { WelcomePage, pageId as welcomePageId } from "./welcome-page"
import { WhoAmIPage, pageId as whoAmIId } from "./who-am-i"

// TODO unhardcode stuff
export type pageId = typeof welcomePageId | typeof whoAmIId

export type pageType<givenPageId extends pageId> = {
  pageId: givenPageId
  page: ReactElement
}



type pagesType = Array<ReactElement>

export const pages: pagesType = [
  <WelcomePage key={welcomePageId}/>,
  <WhoAmIPage key={whoAmIId}/>
]