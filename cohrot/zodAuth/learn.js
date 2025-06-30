const zod = require("zod");

//ZOd

function validateInput(arr) {
  const schema = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
  });
  //   const schema = zod.array(zod.number());
  const response = schema.safeParse(arr);
  console.log(response);
}

// validateInput([1, 2, 3]);
validateInput({
  email: "naro@gmail.com",
  password: "123456789",
});

// Email ==> string ==> should look like email
// password => shold have 8 letters
