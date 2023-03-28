import { Movie } from '../domain/movie';
import { EntityID } from '../core/domain/EntityID';
import IMovieDTO from '../dtos/IMovieDTO';
import IMoviePersistence from '../dtos/IMoviePersistence';

import { Document, Model } from 'mongoose';

export class MovieMapper {
	public static toDomain(schema: any | Model<IMoviePersistence & Document>): Movie {
		return Movie.create(
			{
				title: schema.title,
				director: schema.director,
				releaseYear: schema.releaseYear,
				hidden: schema.hidden,
			},
			new EntityID(schema.id)
		);
	}

	public static toDTO(movie: Movie): IMovieDTO {
		return {
			id: movie.id.toValue(),
			title: movie.title,
			director: movie.director,
			releaseYear: movie.releaseYear,
			hidden: movie.hidden,
		} as IMovieDTO;
	}

	public static toPersistence(movie: Movie): IMoviePersistence {
		return {
			_id: movie.id.toValue(),
			title: movie.title,
			director: movie.director,
			releaseYear: movie.releaseYear,
			hidden: movie.hidden,
		} as IMoviePersistence;
	}
}
