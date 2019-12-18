# How To Access

1. open your terminal, access your project location. example :
   ```sh
   cd movie-graphql/
   ```
2. install all dependencies

   ```sh
   npm install
   ```

3. run this command below, then press ENTER :
   ```sh
   npm run dev
   ```
4. Open GraphiQL
   ```sh
   localhost:4000/graphql
   ```
5. Select all movie :

```
{
    movies{
        title
        genre
    }
}
```

6. select all actor :

```
{
    actors{
        name
        gender
    }
}
```

7. select all actor with their movie :

```
{
    actors{
        name
        movies{
            title
        }
    }
}
```
