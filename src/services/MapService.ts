import { instance } from 'src/services/Interceptor/interceptor';
import { environment } from '../environment/environment';
import * as turf from '@turf/turf';

export async function GetEmpresasData(filters: any[]) {
  const response = await instance.get(`${environment.baseUrl}/EMPRESAS`);
  let arrayEmpresas = response.data.empresas;
  if (filters.length <= 0) return arrayEmpresas;

  for (const filter of filters) {
    switch (filter.type) {
      case 'CNAE':
        if (filter.values.length <= 0) break;
        arrayEmpresas = arrayEmpresas.filter((empresa: any) => {
          if (
            filter.values.some((cnae: string) => empresa.CNAES.includes(cnae))
          )
            return empresa;
        });
        break;

      case 'COORD':
        arrayEmpresas = filtrarEmpresasNoPoligono(filter.values, arrayEmpresas);
        break;
      default:
        break;
    }
  }
  return arrayEmpresas;
}

export async function GetCNAEList() {
  const response = await instance.get(`${environment.baseUrl}/CNAES`);
  return response.data.cnaes;
}

const filtrarEmpresasNoPoligono = (poligono: any, empresas: any) => {
  const poligonoTurf = turf.polygon(poligono.coordinates[0]);
  const empresasNoPoligono = empresas.filter((empresa: any) => {
    const pontoEmpresa = turf.point([Number(empresa.LNG), Number(empresa.LAT)]);
    return turf.booleanPointInPolygon(pontoEmpresa, poligonoTurf);
  });
  return empresasNoPoligono;
};

export function createCircle(
  coordenadaCentral: any,
  raioEmKilometros: any,
  numeroDePontos = 32
) {
  const pontoCentral = turf.point(coordenadaCentral);
  const circulo = turf.circle(pontoCentral, raioEmKilometros, {
    steps: numeroDePontos,
  });
  return circulo.geometry.coordinates;
}

export function getCircle(circle: any) {
  return turf.circle(circle.center, circle.radius, {
    steps: 32,
  });
}

export function findPolygonPartInsideCircle(polygon: any, circle: any) {
  if (polygon.coordinates[0].length < 4) return false;
  if (turf.booleanWithin(polygon, circle)) {
    // O polígono está completamente dentro do círculo.
    return turf.feature(polygon);
  } else if (turf.booleanOverlap(polygon, circle)) {
    // Verifica se há interseção entre o polígono e o círculo.
    return turf.intersect(polygon, circle);
  } else {
    return null;
  }
}
