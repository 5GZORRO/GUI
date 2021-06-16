curl --location --request POST 'http://172.28.3.111/operatora/legal-prose-repository/api/v1/legal-prose-templates' \
--form 'templateFile=@"/home/rogeriocsilva/Downloads/acceptance-of-delivery@0.14.0.cta"' \
--form 'proposeTemplateRequest="{
    \"name\": \"Basic Template - with LICENCE \",
    \"description\": \"This is a skeleton prose template archive\",
    \"category\":\"LICENSE\"
}";type=application/json' -v