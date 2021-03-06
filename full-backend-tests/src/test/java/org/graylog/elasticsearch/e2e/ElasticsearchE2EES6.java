/**
 * This file is part of Graylog.
 *
 * Graylog is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Graylog is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Graylog.  If not, see <http://www.gnu.org/licenses/>.
 */
package org.graylog.elasticsearch.e2e;

import io.restassured.specification.RequestSpecification;
import org.graylog.storage.elasticsearch6.ElasticsearchInstanceES6Factory;
import org.graylog.testing.completebackend.ApiIntegrationTest;
import org.graylog.testing.completebackend.GraylogBackend;

import static org.graylog.testing.completebackend.Lifecycle.CLASS;

@ApiIntegrationTest(serverLifecycle = CLASS, extraPorts = {ElasticsearchE2E.GELF_HTTP_PORT}, elasticsearchFactory = ElasticsearchInstanceES6Factory.class)
public class ElasticsearchE2EES6 extends ElasticsearchE2E {
    public ElasticsearchE2EES6(GraylogBackend sut, RequestSpecification requestSpec) {
        super(sut, requestSpec);
    }
}
