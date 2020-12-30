/* eslint no-shadow: 0 */
/* eslint no-unused-vars: 0 */
enum RouteNames {
  Home = '/',
  ListCharactersPage = '/characters',
  ViewCharacterPage = '/characters/:idCharacter',
  ListComicsPage = '/comics',
  ViewComicPage = '/comics/:idComic',
  ListStoriesPage = '/stories',
  ViewStoryPage = '/stories/:idStory',
  CharacterBookmarks = '/bookmarks/characters',
  ComicBookmarks = '/bookmarks/comics',
  StoryBookmarks = '/bookmarks/stories',
}

export default RouteNames;
