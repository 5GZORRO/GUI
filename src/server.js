/* eslint-disable */
import { createServer, Model, Factory, belongsTo, hasMany, RestSerializer } from 'miragejs'
import faker from 'faker'

export function makeServer({ environment = 'development' } = {}) {
  const server = createServer({
    environment,

    serializers: {
      application: RestSerializer
      /* resource: RestSerializer.extend({
        serializeIds: false,
        include: ['resourceSpecification', 'category', 'resourcePhysicalCapabilities', 'resourceVirtualCapabilities'],
        embed: true
      }),
      resourcePhysicalCapabilitie: RestSerializer.extend({
        serializeIds: false,
        include: ['hardwareCapabilities', 'feature'],
        embed: true
      }),
      resourceVirtualCapabilitie: RestSerializer.extend({
        serializeIds: false,
        include: ['virtualCapabilities'],
        embed: true
      }) */
    },

    models: {
      pagedGovernanceProposal: Model,
      resourceCandidate: Model,

      category: Model,

      resourceSpecification: Model,

      resourcePhysicalCapabilitie: Model.extend({
        hardwareCapabilities: hasMany(),
        feature: belongsTo()
      }),

      hardwareCapabilitie: Model,
      feature: Model,

      resourceVirtualCapabilitie: Model.extend({
        virtualCapabilities: hasMany()
      }),
      virtualCapabilitie: Model
    },

    factories: {
      pagedGovernanceProposal: Factory.extend({
        proposalId() {
          return faker.random.uuid()
        },
        status() {
          return faker.random.arrayElement(['PROPOSED', 'APPROVED', 'REJECTED'])
        },
        actionType() {
          return faker.random.arrayElement([
            'ONBOARD_STAKEHOLDER',
            'NEW_LEGAL_PROSE_TEMPLATE',
            'ARCHIVE_LEGAL_PROSE_TEMPLATE',
            'SLA_DISPUTE'
          ])
        },
        statusUpdated() {
          return faker.date.recent()
        },
        actionParams() {
          return {
            entityIdentityId: faker.random.uuid(),
            evidence: faker.random.word()
          }
        }
      }),

      resourceCandidate: Factory.extend({
        baseType() {
          return 'string'
        },
        schemaLocation() {
          return 'string'
        },
        type() {
          return 'string'
        },
        category: [
          {
            baseType() {
              return 'string'
            },
            schemaLocation() {
              return 'string'
            },
            type() {
              return 'string'
            },
            href() {
              return faker.internet.url()
            },
            id() {
              return faker.random.uuid()
            },
            name() {
              return faker.lorem.sentence()
            },
            version() {
              return faker.system.semver()
            }
          }
        ],
        description() {
          return faker.lorem.sentences()
        },
        href() {
          return faker.internet.url()
        },
        id() {
          return faker.random.uuid()
        },
        lastUpdate() {
          return faker.date.past()
        },
        lifecycleStatus() {
          return faker.random.arrayElement(['pending', 'new', 'archive', 'delete'])
        },
        name() {
          return faker.lorem.sentence()
        },

        resourceSpecification() {
          return {
            referredType() {
              return 'string'
            },
            baseType() {
              return 'string'
            },
            schemaLocation() {
              return 'string'
            },
            type() {
              return 'string'
            },
            href() {
              return faker.internet.url()
            },
            id() {
              return faker.random.uuid()
            },
            name() {
              return faker.commerce.productName()
            },
            version() {
              return faker.system.semver()
            }
          }
        },

        validFor() {
          return {
            endDateTime() {
              return faker.date.past()
            },
            startDateTime() {
              return faker.date.future()
            }
          }
        },

        version() {
          return faker.random.uuid()
        }
      }),

      resource: Factory.extend({
        name() {
          return faker.lorem.word()
        },
        description() {
          return faker.commerce.productDescription()
        },
        version() {
          return faker.system.semver()
        },
        validFor() {
          return faker.date.past()
        },
        ownerdid() {
          return faker.random.uuid()
        }
      }),

      category: Factory.extend({
        name() {
          return faker.lorem.word()
        },
        type() {
          return faker.name.jobType()
        },
        version() {
          return faker.system.semver()
        }
      }),

      resourceSpecification: Factory.extend({
        name() {
          return faker.lorem.word()
        },
        description() {
          return faker.commerce.productDescription()
        },
        version() {
          return faker.system.semver()
        }
      }),

      resourcePhysicalCapabilitie: Factory.extend({
        name() {
          return faker.lorem.word()
        },
        description() {
          return faker.commerce.productDescription()
        }
      }),

      feature: Factory.extend({
        bundled() {
          return faker.random.boolean()
        },
        type() {
          return faker.random.word()
        }
      }),

      hardwareCapabilitie: Factory.extend({
        value() {
          return faker.random.float()
        },
        quota() {
          return faker.random.word()
        }
      }),

      resourceVirtualCapabilitie: Factory.extend({
        name() {
          return faker.lorem.word()
        },
        description() {
          return faker.commerce.productDescription()
        },
        isMaster() {
          return faker.random.boolean()
        },
        type() {
          return faker.database.type()
        }
      }),

      virtualCapabilitie: Factory.extend({
        capValue() {
          return faker.random.float()
        },
        capUnit() {
          return faker.random.number()
        }
      })
    },

    seeds(server) {
      server.createList('pagedGovernanceProposal', 60)
      server.create('resourceCandidate')
    },

    routes() {
      this.get('/governance-actions', (schema) => {
        const content = schema.pagedGovernanceProposals.all()
        const items = content.models.map(({ attrs }) => ({ ...attrs }))
        return {
          pagedGovernanceProposals: {
            totalPages: 0,
            totalElements: items.length || 0,
            size: items.length || 0,
            content: items,
            number: items.length,
            sort: {
              sorted: true,
              unsorted: true,
              empty: false
            },
            pageable: {
              page: 0,
              size: 5,
              sort: ['string']
            },
            first: true,
            last: true,
            numberOfElements: 5,
            empty: !items
          }
        }
      })

      this.post('/governance-actions', (schema, request) => {
        const attrs = JSON.parse(request.requestBody)
        console.log(attrs)

        return schema.pagedGovernanceProposals.create(attrs)
      })

      this.get('/tmf-api/resourceCatalogManagement/v2/resourceCandidate', (schema, serialize) => {
        const resourceCandidates = schema.resourceCandidates.all()
        return resourceCandidates
      })

      this.get('/tmf-api/resourceCatalogManagement/v2/resourceCandidate/:id', (schema, request) => {
        const id = request.params.id
        return [
          {
            '@baseType': 'string',
            '@schemaLocation': 'string',
            '@type': 'string',
            category: [
              {
                '@baseType': 'string',
                '@schemaLocation': 'string',
                '@type': 'string',
                href: 'string',
                id: 'string',
                name: 'string',
                version: 'string'
              }
            ],
            description: 'ubiTest new resource candidate',
            href: 'http://localhost:8080/tmf-api/resourceCatalogManagement/v2/resourceCandidate/a0af6efd-840a-438c-b9f0-f449ba2039d4',
            id: 'a0af6efd-840a-438c-b9f0-f449ba2039d4',
            lastUpdate: '2021-03-17T16:17:36.918Z',
            lifecycleStatus: 'pending',
            name: 'ubiTest',
            resourceSpecification: {
              '@baseType': 'string',
              '@referredType': 'string',
              '@schemaLocation': 'string',
              '@type': 'string',
              href: 'string',
              id: 'string',
              name: 'string',
              version: 'string'
            },
            validFor: {
              endDateTime: '2022-03-17T16:17:36.918Z',
              startDateTime: '2021-03-17T16:17:36.918Z'
            },
            version: '0.1.0'
          }
        ]
      })

      /*  this.get('/resources', (schema, request) => {
        const attrs = JSON.parse(request.requestBody)
        console.log(attrs)
        return schema.resources.all()
      })

      this.get('/resources/:id', (schema, request) => {
        const id = request.params.id
        console.log('id')
        return schema.resources.find(id)
        // new Response(400, { some: 'header' }, { errors: [ 'name cannot be blank'] });
      })

      this.post('/resources', (schema, request) => {
        const attrs = JSON.parse(request.requestBody)
        console.log(attrs)
        return schema.resources.create(attrs)
        // new Response(400, { some: 'header' }, { errors: [ 'name cannot be blank'] });
      })

      this.post('/resources/:id/category', (schema, request) => {
        const attrs = JSON.parse(request.requestBody)
        console.log(attrs)
        return schema.category.create(attrs)
        // new Response(400, { some: 'header' }, { errors: [ 'name cannot be blank'] });
      }) */
    }
  })

  return server
}
