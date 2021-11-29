movies = open("data/movies_corrected.csv", "r")
posters = open("data/movie_poster.csv", "r")
ratings = open("data/ratings.csv", "r")

movie_data = open("data/movie.dat", "w")


movie_list = movies.readlines()
poster_list = posters.readlines()
rating_list = ratings.readlines()


posters_list = [poster.split(",") for poster in poster_list]
ratings_list = [rating.split(",") for rating in rating_list]

for line in movie_list:
    chunk = line[:-1].split('"')
    id = chunk[0][:-1]
    title = chunk[1]
    year = title[-6:][1:-1]
    title = title[:-7]
    genre = chunk[2][1:]

    sum = 0
    count = 0
    for rating in ratings_list:
        if rating[1] == id:
            sum += int(rating[2])
            count += 1

    if count != 0:
        rating = round(sum / count, 2)
    else:
        rating = 0

    movie_poster = "No Image"
    for poster in posters_list:
        if poster[0] == id:
            movie_poster = poster[1]

    movie_data.write("::".join([id, title, year, genre, str(rating), movie_poster]))

movies.close()
posters.close()
ratings.close()
movie_data.close()
