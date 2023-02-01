const Koa = require('koa');
const KoaRouter = require('koa-router');
const koaBody = require('koa-body');
const MongoConnection = require('./mongo');
const { spawn } = require('child_process');
const sanitize = require("mongo-sanitize");

const app = new Koa();
const router = KoaRouter();

console.log('server started');

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
    const pyProg = spawn("python3", ["/home/herby/apps/TeammateLinker/PythonScripts/SolveGame.py", sanitize(ctx.query.startPlayer), sanitize(ctx.query.endPlayer)]);
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

router.get("/api/checkhighscore", async (ctx, next) => {
  let highScoreResp =  await MongoConnection.checkHighScore(ctx.query.playerOne, ctx.query.playerTwo);
  highScoreResp = (highScoreResp === null) ? "no_scores" : highScoreResp;
  ctx.body = highScoreResp;
});

router.post("/api/updatescore", koaBody(), async (ctx, next) => {
  const updateResult = MongoConnection.updateHighScore(ctx.request.body);
  ctx.body = updateResult;
});

router.get("/api/getallscores", async (ctx, next) => {
  const allScores = await MongoConnection.getAllScores();
  ctx.body = allScores;
});

router.post("/api/solvegame", koaBody(), async (ctx, next) => {
  const { startPlayer, endPlayer } = ctx.request.body;
  const solvedGame = MongoConnection.solveGame([startPlayer], endPlayer, true);
})

app
  .use(router.routes())
  .listen(3001, () => {
    MongoConnection.init();
  });