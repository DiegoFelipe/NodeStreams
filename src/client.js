import axios from "axios";
import { Transform, Writable } from "stream";

const url = "http://localhost:3000";

async function consume() {
  const response = await axios({
    url,
    method: "get",
    responseType: "stream",
  });
  return response.data;
}

const stream = await consume();
stream
  .pipe(
    new Transform({
      transform(chunck, enc, cb) {
        const item = JSON.parse(chunck);
        const myNumber = /\d+/.exec(item.name)[0];
        let name = item.name;

        if (myNumber % 2 === 0) name = name.concat("eh par");
        else name = name.concat("eh impar");

        item.name = name;
        //   console.log(myNumber);
        cb(null, JSON.stringify(item));
      },
    })
  )
  .pipe(
    new Writable({
      // chunck = um pedaço do buffer // um pedaço de um arquivo por ex
      write(chunck, enc, cb) {
        console.log("chegou pae", chunck.toString());
        cb();
      },
    })
  );
