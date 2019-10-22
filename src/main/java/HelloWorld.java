

import org.apache.log4j.BasicConfigurator;
import org.json.JSONException;
import org.xml.sax.SAXException;
import javax.xml.parsers.ParserConfigurationException;

import javax.xml.transform.TransformerException;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.MalformedURLException;
import java.net.URL;

import java.net.URLConnection;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.stream.Collectors;

import org.json.JSONObject;
import org.json.XML;
import static spark.Spark.*;
import static spark.Spark.redirect;

public class HelloWorld {

    public static void main(String[] args) throws IOException, ParserConfigurationException, SAXException, TransformerException {
        // URL: Localhost:4567/ and route...
        BasicConfigurator.configure();

        get("getJSON/:date", (request, response) ->{
            String xmlFromWeb = getXML(request.params(":date") );
            System.out.println(request.params(":date"));
            JSONObject Json = convertXmlToJson(xmlFromWeb);
            return Json;
        });
    }


    public static String getXML(String date) throws IOException {
        String webUrl = "http://www.lb.lt/lt/currency/daylyexport/?xml=1&class=Eu&type=day&date_day=";
        //check date format and to url
        if(isValidFormat("yyyy-MM-dd", date)){
            webUrl = webUrl + date;
        }
        System.out.println(webUrl);
        URL url = new URL(webUrl);
        URLConnection connection = url.openConnection();
        String redirect = connection.getHeaderField("Location");
        //Checking for redirection from URL
        if (redirect != null){
            connection = new URL(redirect).openConnection();
        }
        BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()));
        String inputLine = in.lines().collect(Collectors.joining());
        return inputLine;
    }
    public static JSONObject convertXmlToJson(String xml){
        JSONObject xmlJSONObj = XML.toJSONObject(xml);
        return xmlJSONObj;
    }
    public static boolean isValidFormat(String format, String value) {
        Date date = null;
        try {
            SimpleDateFormat sdf = new SimpleDateFormat(format);
            date = sdf.parse(value);
            if (!value.equals(sdf.format(date))) {
                date = null;
            }
        } catch (ParseException ex) {
            ex.printStackTrace();
        }
        return date != null;
    }
}
