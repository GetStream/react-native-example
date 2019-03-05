// @flow

import stream from 'getstream';
import faker from 'faker';

import type { UserSession, CloudClient } from '../types';

import dotenv from 'dotenv';
dotenv.config();

async function main() {
  let apiKey = process.env.STREAM_API_KEY;
  let apiSecret = process.env.STREAM_API_SECRET;
  let appId = process.env.STREAM_APP_ID;
  if (!apiKey) {
    console.error('STREAM_API_KEY should be set');
    return;
  }

  if (!appId) {
    console.error('STREAM_APP_ID should be set');
    return;
  }

  if (!apiSecret) {
    console.error('STREAM_SECRET should be set');
    return;
  }

  function createUserSession(userId): UserSession {
    return stream.connect(apiKey, stream.signing.JWTUserSessionToken(apiSecret, userId), appId);
  }

  let batman = createUserSession('batman');
  let fluff = createUserSession('fluff');
  let league = createUserSession('justiceleague');
  let bowie = createUserSession('davidbowie');

  console.log('Add the following line to your .env file');
  console.log('STREAM_API_TOKEN=' + batman.userToken);

  await batman.currentUser.getOrCreate({
    name: 'Batman',
    url: 'batsignal.com',
    desc: 'Smart, violent and brutally tough solutions to crime.',
    profileImage:
      'https://i.kinja-img.com/gawker-media/image/upload/s--PUQWGzrn--/c_scale,f_auto,fl_progressive,q_80,w_800/yktaqmkm7ninzswgkirs.jpg',
    coverImage:
      'https://i0.wp.com/photos.smugmug.com/Portfolio/Full/i-mwrhZK2/0/ea7f1268/X2/GothamCity-X2.jpg?resize=1280%2C743&ssl=1',
  });

  await fluff.currentUser.getOrCreate({
    name: 'Fluff',
    url: 'fluff.com',
    desc: 'Sweet I think',
    profileImage:
      'https://mylittleamerica.com/988-large_default/durkee-marshmallow-fluff-strawberry.jpg',
    coverImage: '',
  });

  await league.currentUser.getOrCreate({
    name: 'Justice League',
    profileImage:
      'http://www.comingsoon.net/assets/uploads/2018/01/justice_league_2017___diana_hq___v2_by_duck_of_satan-db3kq6k.jpg',
  });

  await bowie.currentUser.getOrCreate({
    name: 'David Bowie',
    profileImage:
      'http://www.officialcharts.com/media/649820/david-bowie-1100.jpg?',
  });

  let randomUsers = [];
  let randomUsersPromises = [];
  for (let i = 0; i < 30; i++) {
    let session = createUserSession(`random-${i}`);
    randomUsers.push(session);
    randomUsersPromises.push(
      session.currentUser.getOrCreate({
        name: faker.name.findName(),
        profileImage: faker.internet.avatar(),
        desc: faker.lorem.sentence(),
      }),
    );
  }
  await Promise.all(randomUsersPromises);

  await batman.feed('user').follow('user', fluff.currentUser);
  await batman.feed('user').follow('user', bowie.currentUser);
  await batman.feed('user').follow('user', league.currentUser);
  await league.feed('user').follow('user', batman.currentUser);

  let batmanActivity = await batman.feed('user').addActivity({
    foreign_id: 'batman-3',
    time: '2018-08-13T01:23:47',

    actor: batman.currentUser,
    verb: 'post',
    object: '-',

    content:
      'Just beat the joker again. Will he ever give me a real challenge?',
  });

  let fluffActivity = await fluff.feed('user').addActivity({
    foreign_id: 'fluff-3',
    time: '2018-07-19T13:23:47',

    actor: fluff.currentUser,
    verb: 'comment',
    object: fluff.currentUser,

    content: 'Great podcast with @getstream and @feeds! Thanks guys!',
  });

  let wonderWomenActivity = await league.feed('user').addActivity({
    foreign_id: 'league-2',
    time: '2018-07-19T13:15:12',

    actor: league.currentUser,
    verb: 'post',
    object: '-',

    content: 'Wonder Woman is going to be great!',
    image:
      'http://www.comingsoon.net/assets/uploads/2018/01/justice_league_2017___diana_hq___v2_by_duck_of_satan-db3kq6k.jpg',
  });
  let podcast;

  try {
    podcast = await bowie.collections.add('podcast','hello-world-podcast', {
      title: 'Hello World',
      description: 'This is ground control for mayor Tom',
    });
  } catch (e) {
    podcast = await bowie.collections.get('podcast', 'hello-world-podcast');
  }

  let bowieActivity = await bowie.feed('user').addActivity({
    foreign_id: 'bowie-2',
    time: '2018-07-19T13:12:29',

    actor: bowie.currentUser,
    verb: 'repost',
    object: podcast,

    content: 'Great podcast with @getstream and @feeds! Thanks guys!',
  });

  let activities = [];
  for (let i = 1; i < 41; i++) {
    activities.push({
      foreign_id: 'filler-i',
      time: '2018-07-10T01:23:' + (60 - i),

      actor: batman.currentUser,
      verb: 'post',
      object: 'filler number ' + i,

      content: 'filler number ' + i,
    });
  }
  await batman.feed('timeline').addActivities(activities);
  await batman.feed('notification').addActivities(activities);
  response = await batman.feed('timeline').get({
    withReactionCounts: true,
    withOwnReactions: true,
    withRecentReactions: true,
  });

  await ignore409(() =>
    Promise.all(
      randomUsers.slice(5, 9).map((user, i) =>
        user.reactions.add('heart', batmanActivity, {
          id: `random-heart-batman-3-${i}`,
          targetFeeds: [user.feed('notification', batman.currentUser.id)],
        }),
      ),
    ),
  );

  await ignore409(() =>
    Promise.all(
      randomUsers.slice(8, 17).map((user, i) =>
        user.reactions.add('repost', batmanActivity, {
          id: `random-repost-batman-3-${i}`,
          data: {
            text: 'The Joker is so dumb, hahaha!!!!' + i,
          },
          targetFeeds: [user.feed('notification', batman.currentUser.id)],
        }),
      ),
    ),
  );

  await ignore409(() =>
    Promise.all(
      randomUsers.slice(11, 27).map((user, i) =>
        user.feed('notification', batman.currentUser.id).addActivity({
          foreign_id: 'follow:batman-random-' + i,
          time: '2018-08-10T13:12:' + i,

          actor: user.currentUser,
          verb: 'follow',
          object: batman.currentUser,
        }),
      ),
    ),
  );

  await ignore409(() =>
    Promise.all(
      randomUsers.slice(1, 20).map((user, i) =>
        user.reactions.add('heart', fluffActivity, {
          id: `random-heart-fluff-2-${i}`,
        }),
      ),
    ),
  );

  await ignore409(() =>
    Promise.all(
      randomUsers.slice(1, 5).map((user, i) =>
        user.reactions.add('repost', fluffActivity, {
          id: `random-repost-fluff-2-${i}`,
          data: {
            text: 'best podcast ever!!!!' + i,
          },
        }),
      ),
    ),
  );

  await ignore409(() =>
    Promise.all(
      randomUsers.slice(7, 9).map((user, i) =>
        user.reactions.add('comment', fluffActivity, {
          id: `random-comment-fluff-2-${i}`,
          data: {
            text: `Oh yeah! ${(user.currentUser.data || {}).name ||
              'Unknown'} loves this!`,
          },
        }),
      ),
    ),
  );

  await ignore409(() =>
    Promise.all(
      randomUsers.slice(22, 26).map((user, i) =>
        user.reactions.add('heart', wonderWomenActivity, {
          id: `random-heart-wonderwomen-${i}`,
        }),
      ),
    ),
  );

  await ignore409(() =>
    Promise.all(
      randomUsers.slice(12, 19).map((user, i) =>
        user.reactions.add('comment', bowieActivity, {
          id: `random-comment-bowie-${i}`,
          data: {
            text: `${(user.currentUser.data || {}).name ||
              'Unknown'} thinks this is the best podcast ever!`,
          },
        }),
      ),
    ),
  );

  await ignore409(async () => {
    await batman.reactions.add('heart', fluffActivity, { id: `batman-heart-fluff-2` });
  });
}
main();

async function ignore409(asyncfn) {
  try {
    await asyncfn();
  } catch (e) {
    if (
      !(e instanceof stream.errors.StreamApiError) ||
      e.response.statusCode != 409
    ) {
      throw e;
    }
  }
}
