const AbstractManager = require("./AbstractManager");

class SongManager extends AbstractManager {
  static table = "song";

  insert(song) {
    return this.connection.query(
      `insert into ${SongManager.table} (label) values (?)`,
      [song.filePath]
    );
  }

  update(song) {
    return this.connection.query(
      `update ${SongManager.table} set label = ? where id = ?`,
      [song.label, song.id]
    );
  }
}

module.exports = SongManager;
