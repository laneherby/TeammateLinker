const Koa = require('koa');
const KoaRouter = require('koa-router');
const MongoConnection = require('./mongo')

const app = new Koa();
const router = KoaRouter();


router.get("/api", (ctx, next) => {
    ctx.body = {"message": "I'm here"};
})

router.get("/api/gettwoplayers", async (ctx, next) => {
  const randomPlayers = await MongoConnection.getTwoRandomPlayers(ctx.query.startYear, ctx.query.endYear);
  ctx.body = randomPlayers;
})

router.get("/api/getteammates/:playerID", async (ctx, next) => {
  //need to url encode the player url before sending here
  const teammates = await MongoConnection.getPlayerTeammates(ctx.params.playerID);
  ctx.body = teammates;
});

router.get("/api/search/:name", async (ctx, next) => {
  console.log(ctx.params.name)
  const searchResult = await MongoConnection.searchPlayerNames(ctx.params.name);
  ctx.body = searchResult;
});


app
  .use(router.routes())
  .listen(3001, () => {
    MongoConnection.init();
  });