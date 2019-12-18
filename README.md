# How To Access

1. open your terminal, access your project location. example :
   ```sh
   cd movie-graphql/
   ```
2. run this command below, then press ENTER :
   ```sh
   npm run dev
   ```
3. Open
   ```sh
   localhost:4000/graphql
   ```
4. Select all movie :

```
{
    movies{
        title
        genre
    }
}
```

5. select all actor :

```
{
    actors{
        name
        gender
    }
}
```
