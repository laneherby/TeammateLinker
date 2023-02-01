const getPlayerTeamYears = (player) => {
    const teams = player.teams.map((t) => t.name);
    const years = player.teams.reduce((acc, team) => [...acc, ...team.years], [])

    return {
        teams,
        years
    };
}

const checkForTeammates = (searchedPlayers, endPlayerTeamYears) => {
    const teammateCheck = {
        areTeammates: false,
        teammateID: null
    };

    for (const player of searchedPlayers) {
        const playerTeamYears = getPlayerTeamYears(player);

        const sameTeam = endPlayerTeamYears.teams.some((team) => playerTeamYears.teams.includes(team));
        const sameYear = endPlayerTeamYears.years.some((year) => playerTeamYears.years.includes(year));

        if(sameTeam && sameYear) {
            teammateCheck.areTeammates = true;
            teammateCheck.teammateID = player._id;
            break;
        }
    }
    
    return teammateCheck;
};

const players = [
    {"_id":"/players/h/hunteto01.shtml","url":"/players/h/hunteto01.shtml","name":"Torii Hunter","image":"https://www.baseball-reference.com/req/202108020/images/headshots/7/79f9873b_br.jpg","teams":[{"name":"MIN","years":[1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2015]},{"name":"LAA","years":[2008,2009,2010,2011,2012]},{"name":"DET","years":[2013,2014]}],"searchName":"torii hunter"},
    {"_id":"/players/m/mauerjo01.shtml","url":"/players/m/mauerjo01.shtml","name":"Joe Mauer","image":"https://www.baseball-reference.com/req/202108020/images/headshots/4/43c69595_mlbam.jpg","teams":[{"name":"MIN","years":[2004,2005,2006,2007,2008,2009,2010,2011,2012,2013,2014,2015,2016,2017,2018]}],"searchName":"joe mauer"},
    {"_id":"/players/t/troutmi01.shtml","url":"/players/t/troutmi01.shtml","name":"Mike Trout","image":"https://www.baseball-reference.com/req/202108020/images/headshots/f/f322d40f_mlbam.jpg","teams":[{"name":"LAA","years":[2011,2012,2013,2014,2015,2016,2017,2018,2019,2020,2021]}],"searchName":"mike trout"}
]

module.exports = {
    getPlayerTeamYears,
    checkForTeammates
}

//query to find connections between start players and end player
//where we use the team object and put it in this query
//{$and: [{teams: {$elemMatch: { name: 'LAA', years: { $in: [ 2011, 2012 ] }}}}, {teams: {$elemMatch: { name: 'MIN', years: { $in: [ 2003, 2004 ] }}}}]}


//maybe find players with longest careers that didn't play with selected player?
//query to find all teammates for specified players, use teams object to fill this query
//{$or: [{teams: {$elemMatch: { name: 'LAA', years: { $in: [ 2011, 2012 ] }}}}, {teams: {$elemMatch: { name: 'MIN', years: { $in: [ 2003, 2004 ] }}}}]}

//same query with 'and' added at beginning and endPlayer team designations to find direct matches, here the player played for LAA and MIN but we're looking for NYY
//{$and: [{$or: [{teams: {$elemMatch: { name: 'LAA', years: { $in: [ 2011, 2012 ] }}}}, {teams: {$elemMatch: { name: 'MIN', years: { $in: [ 2003, 2004 ] }}}}]}, {teams: {$elemMatch: {name: "NYY", years: {$in: [2019]}}}}]}