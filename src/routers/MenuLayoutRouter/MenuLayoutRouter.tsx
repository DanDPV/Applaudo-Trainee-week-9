import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import Loading from 'components/Loading/Loading';
import Navbar from 'components/Navbar/Navbar';
import Footer from 'components/Footer/Footer';
import RouteNames from 'routers/RouteNames';
import 'routers/MenuLayoutRouter/MenuLayoutRouter.scss';

const HomePage = lazy(() => import('pages/HomePage/HomePage'));
const ListCharactersPage = lazy(() => import('pages/characters/ListCharactersPage/ListCharactersPage'));
const ListComicsPage = lazy(() => import('pages/comics/ListComicsPage/ListComicsPage'));
const ListStoriesPage = lazy(() => import('pages/stories/ListStoriesPage/ListStoriesPage'));
const CharacterBookmarks = lazy(() => import('pages/bookmarks/CharacterBookmarks/CharacterBookmarks'));
const ComicBookmarks = lazy(() => import('pages/bookmarks/ComicBookmarks/ComicBookmarks'));
const StoryBookmarks = lazy(() => import('pages/bookmarks/StoryBookmarks/StoryBookmarks'));

const MenuLayoutRouter = () => (
  <div className="page-container">
    <div className="content-wrap">
      <Navbar />
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path={RouteNames.ListCharactersPage} component={ListCharactersPage} />
          <Route exact path={RouteNames.ListComicsPage} component={ListComicsPage} />
          <Route exact path={RouteNames.ListStoriesPage} component={ListStoriesPage} />
          <Route exact path={RouteNames.CharacterBookmarks} component={CharacterBookmarks} />
          <Route exact path={RouteNames.ComicBookmarks} component={ComicBookmarks} />
          <Route exact path={RouteNames.StoryBookmarks} component={StoryBookmarks} />
          <Route path={RouteNames.Home} component={HomePage} />
        </Switch>
      </Suspense>
    </div>
    <Footer />
  </div>
);

export default MenuLayoutRouter;
