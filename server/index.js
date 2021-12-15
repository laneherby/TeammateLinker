const Koa = require('koa');
const KoaRouter = require('koa-router');
const MongoConnection = require('./mongo');
const { spawn } = require('child_process');
const sanitize = require("mongo-sanitize");

const app = new Koa();
const router = KoaRouter();


router.get("/api", (ctx, next) => {
    ctx.body = {"message": "I'm here"};
})

router.get("/api/gettwoplayers", async (ctx, next) => {
  const randomPlayers = await MongoConnection.getTwoRandomPlayers(sanitize(ctx.query.startYear), sanitize(ctx.query.endYear));
  ctx.body = randomPlayers;
})

router.get("/api/getteammates/:playerID", async (ctx, next) => {
  //need to url encode the player url before sending here
  const teammates = await MongoConnection.getPlayerTeammates(sanitize(ctx.params.playerID));
  ctx.body = teammates;
});

router.get("/api/search/:name", async (ctx, next) => {
  const searchResult = await MongoConnection.searchPlayerNames(sanitize(ctx.params.name));
  ctx.body = searchResult;
});

router.get("/api/solve", async (ctx, next) => {  
  const runPy = new Promise((resolve, reject) => {
    const pyProg = spawn("python3", ["/home/herby/app/TeammateLinkerGame/PythonScripts/SolveGame.py", sanitize(ctx.query.startPlayer), sanitize(ctx.query.endPlayer)]);
    let playerList = [];

    pyProg.stdout.on("data", (data) => {
        playerList.push(data.toString());
    });

    pyProg.stderr.on("data", (data) => {
        reject(data.toString());
    });

    pyProg.on("close", (code) => {
        playerList = playerList.toString().split("\n");
        playerList.pop();
        resolve(playerList);
    });
  });

  ctx.body = await runPy;
});

app
  .use(router.routes())
  .listen(3001, () => {
    MongoConnection.init();
  });